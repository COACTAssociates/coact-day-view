import React from "react";
import { DayView } from "../components/day-view";

export function RenderWidget({ app }) {
  const queryParams = new URLSearchParams(window.location.search);
  const widgetId = queryParams.get("widgetId");

  if (widgetId === "day-view") {
    return <DayView app={app} />;
  }

  return <div>Widget not found</div>;
}
