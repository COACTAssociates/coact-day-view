import React, { useState, useEffect } from "react";

// Time block labels displayed in the left nav widget
const BLOCK_LABELS = ["Morning", "Late Morning", "Afternoon", "Late Afternoon"];

// Warn the user when they have an unusually high number of tasks — prompts them to reassign.
// Set high since we currently show all workspace tasks (no assignee filtering yet).
const TASK_WARNING_THRESHOLD = 200;

// localStorage key used to persist the user's Rocketlane API key across sessions.
// The Rocketlane widget SDK does not expose installation params to the frontend,
// so we store the key in the browser instead.
const STORAGE_KEY = "rl_day_view_api_key";

function getTodayIso() {
  return new Date().toISOString().slice(0, 10);
}

// Thin wrapper around the Rocketlane REST API. Throws on non-2xx responses
// with the full error body included so it surfaces in the UI.
async function apiFetch(apiKey, path) {
  const res = await fetch(`https://api.rocketlane.com/api/1.0/${path}`, {
    headers: { "api-key": apiKey },
  });
  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(`API error: ${res.status}${body ? ` — ${body}` : ""}`);
  }
  return res.json();
}

// Fetches all tasks due today from the workspace.
//
// NOTE: The Rocketlane tasks API does not return assignee data in either the
// list or detail endpoints, and does not support filtering by assignee via
// query params. Until Rocketlane exposes assignee data, this returns all
// workspace tasks due today. userId is accepted but unused — kept here so
// assignee filtering can be added once the API supports it.
async function fetchUserTasks(apiKey, userId) {
  const today = getTodayIso();
  const params = new URLSearchParams({
    "dueDate.ge": today,
    "dueDate.le": today,
  });

  const json = await apiFetch(apiKey, `tasks?${params}`);
  return json.data ?? json ?? [];
}

// Distributes tasks evenly across the four time blocks using round-robin.
// Rocketlane tasks have no time-of-day field, so this is the best we can do.
function distributeIntoBlocks(tasks) {
  const blocks = [[], [], [], []];
  tasks.forEach((task, i) => blocks[i % 4].push(task));
  return blocks;
}

function TaskCard({ task }) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-3 shadow-sm">
      <p className="font-medium text-gray-900 text-sm leading-snug">
        {task.taskName ?? task.name}
      </p>
      {task.project?.projectName && (
        <p className="text-xs text-gray-500 mt-1">{task.project.projectName}</p>
      )}
    </div>
  );
}

function Block({ label, tasks }) {
  return (
    <div className="flex flex-col gap-2">
      <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wide">
        {label}
      </h2>
      {tasks.length === 0 ? (
        <p className="text-xs text-gray-300 italic">No tasks</p>
      ) : (
        tasks.map((task) => <TaskCard key={task.taskId} task={task} />)
      )}
    </div>
  );
}

// Shown on first load when no API key is stored. The user pastes their
// Rocketlane API key (Settings → Integrations → API Keys) and it's saved
// to localStorage so they only need to do this once per browser.
function ApiKeySetup({ onSave }) {
  const [value, setValue] = useState("");

  return (
    <div className="flex flex-col items-center justify-center h-full p-6 gap-4">
      <p className="text-sm font-semibold text-gray-700">Enter your Rocketlane API Key</p>
      <p className="text-xs text-gray-400 text-center">
        Found in Rocketlane under Settings → Integrations → API Keys. Saved locally in your browser.
      </p>
      <input
        type="password"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Paste API key..."
        className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      <button
        onClick={() => value.trim() && onSave(value.trim())}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2 rounded"
      >
        Save & Load Tasks
      </button>
    </div>
  );
}

export function DayView({ app }) {
  // Read the API key from localStorage on mount so returning users skip the setup screen
  const [apiKey, setApiKey] = useState(() => localStorage.getItem(STORAGE_KEY) ?? "");
  const [state, setState] = useState({ status: apiKey ? "loading" : "setup" });

  function handleSaveKey(key) {
    localStorage.setItem(STORAGE_KEY, key);
    setApiKey(key);
    setState({ status: "loading" });
  }

  useEffect(() => {
    if (!app || !apiKey) return;

    setState({ status: "loading" });

    // user.response.userId is how the Rocketlane SDK nests the current user object.
    // Kept for when assignee filtering becomes available in the API.
    app.data
      .get("user")
      .then((user) => {
        const userId = user?.response?.userId ?? user?.id ?? user?.userId;
        return fetchUserTasks(apiKey, userId);
      })
      .then((tasks) => {
        setState({ status: "loaded", tasks });
      })
      .catch((err) => {
        setState({ status: "error", message: err.message });
      });
  }, [app, apiKey]);

  if (state.status === "setup") {
    return <ApiKeySetup onSave={handleSaveKey} />;
  }

  if (state.status === "loading") {
    return (
      <div className="flex items-center justify-center h-full text-gray-400 text-sm">
        Loading your tasks...
      </div>
    );
  }

  if (state.status === "error") {
    return (
      <div className="flex flex-col items-center justify-center h-full p-6 gap-3">
        <p className="text-red-500 text-sm text-center">{state.message}</p>
        {/* Let the user re-enter their key if it's expired or incorrect */}
        <button
          onClick={() => {
            localStorage.removeItem(STORAGE_KEY);
            setApiKey("");
            setState({ status: "setup" });
          }}
          className="text-xs text-blue-500 underline"
        >
          Reset API key
        </button>
      </div>
    );
  }

  const { tasks } = state;

  if (tasks.length > TASK_WARNING_THRESHOLD) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-6 text-center gap-3">
        <p className="text-lg font-semibold text-amber-600">
          You have {tasks.length} tasks today
        </p>
        <p className="text-sm text-gray-500">
          Consider reassigning some to other days.
        </p>
      </div>
    );
  }

  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "short",
    day: "numeric",
  });
  const blocks = distributeIntoBlocks(tasks);

  return (
    <div className="flex flex-col gap-5 p-4 h-full overflow-y-auto">
      <h1 className="text-sm font-bold text-gray-700">{today}</h1>
      {BLOCK_LABELS.map((label, i) => (
        <Block key={label} label={label} tasks={blocks[i]} />
      ))}
    </div>
  );
}
