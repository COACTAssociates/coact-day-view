import React, { useState } from "react";
import { WaitTillAppInitialisedApp } from "./wait-till-app-initialised";
import { RenderWidget } from "./render-widget";

function App() {
  const [app, setApp] = useState(null);

  return (
    <WaitTillAppInitialisedApp onLoaded={setApp} app={app}>
      <RenderWidget app={app} />
    </WaitTillAppInitialisedApp>
  );
}

export default App;
