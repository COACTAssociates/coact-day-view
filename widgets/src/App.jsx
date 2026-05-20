import React, { useState, useEffect } from "react";
import { WaitTillAppInitialisedApp } from "./wait-till-app-initialised";
import { RenderWidget } from "./render-widget";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

function App() {
  const [app, setApp] = useState(null);

  useEffect(() => {
    console.log("App", app);
  }, [app]);

  return (
    <QueryClientProvider client={queryClient}>
      <WaitTillAppInitialisedApp onLoaded={setApp} app={app}>
        <RenderWidget app={app} />
      </WaitTillAppInitialisedApp>
    </QueryClientProvider>
  );
}

export default App;
