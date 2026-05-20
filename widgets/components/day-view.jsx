import React, { useState, useEffect } from "react";

const BLOCK_LABELS = ["Morning", "Late Morning", "Afternoon", "Late Afternoon"];
const TASK_WARNING_THRESHOLD = 20;

function getTodayIso() {
  return new Date().toISOString().slice(0, 10);
}

async function fetchUserTasks(apiKey, userId) {
  const today = getTodayIso();
  const params = new URLSearchParams({
    "startDate.le": today,
    "dueDate.ge": today,
    "task.status.noneOf": "COMPLETED",
    match: "all",
  });

  const res = await fetch(
    `https://api.rocketlane.com/api/1.0/tasks?${params}`,
    {
      headers: {
        "api-key": apiKey,
        "Content-Type": "application/json",
      },
    }
  );

  if (!res.ok) throw new Error(`API error: ${res.status}`);

  const json = await res.json();
  const tasks = json.data ?? json ?? [];

  return tasks.filter((task) =>
    task.assignees?.some((a) => String(a.id ?? a.userId) === String(userId))
  );
}

function distributeIntoBlocks(tasks) {
  const blocks = [[], [], [], []];
  tasks.forEach((task, i) => blocks[i % 4].push(task));
  return blocks;
}

function TaskCard({ task }) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-3 shadow-sm">
      <p className="font-medium text-gray-900 text-sm leading-snug">
        {task.name ?? task.title}
      </p>
      {task.project?.name && (
        <p className="text-xs text-gray-500 mt-1">{task.project.name}</p>
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
        tasks.map((task) => <TaskCard key={task.id} task={task} />)
      )}
    </div>
  );
}

export function DayView({ app }) {
  const [state, setState] = useState({ status: "loading" });

  useEffect(() => {
    if (!app) return;

    const apiKey = app.installationParams?.apiKey;
    if (!apiKey) {
      setState({ status: "error", message: "API key not configured. Please reinstall the app." });
      return;
    }

    app.data
      .get("user")
      .then((user) => {
        const userId = user?.id ?? user?.userId;
        return fetchUserTasks(apiKey, userId);
      })
      .then((tasks) => {
        setState({ status: "loaded", tasks });
      })
      .catch((err) => {
        setState({ status: "error", message: err.message });
      });
  }, [app]);

  if (state.status === "loading") {
    return (
      <div className="flex items-center justify-center h-full text-gray-400 text-sm">
        Loading your tasks...
      </div>
    );
  }

  if (state.status === "error") {
    return (
      <div className="flex items-center justify-center h-full text-red-500 text-sm p-4 text-center">
        {state.message}
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
