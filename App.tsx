import * as React from "react";
import Routes from "./pages/Routes";
import { GluestackUIProvider } from "@gluestack-ui/themed";

function App() {
  return (
    <GluestackUIProvider>
      <Routes />
    </GluestackUIProvider>
  );
}

export default App;
