import React from "react";
import { ProjectTab } from "../components/project-tab";
import { ProjectFinancialsTab } from "../components/project-financials-tab";
import { AccountsTab } from "../components/account-tab";
import { GlobalTab } from "../components/global-tab";

export function RenderWidget({ app }) {
  const queryParams = new URLSearchParams(window.location.search);
  const widgetId = queryParams.get("widgetId");

  if (!widgetId) {
    return <div>Widget not found</div>;
  }

  switch (widgetId) {
    case "project-tab":
      return <ProjectTab app={app} />;
    case "project-financials-tab":
      return <ProjectFinancialsTab app={app} />;
    case "account-tab":
      return <AccountsTab app={app} />;
    case "global-tab":
      return <GlobalTab app={app} />;
    default:
      return <div>Widget not found</div>;
  }
}
