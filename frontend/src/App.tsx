import { Routes, Route } from "react-router-dom";
import Dashboard from "./Scenes/Dashboard/Dashboard";
import { ColorModeContext, useMode } from "./theme";
import { ThemeProvider } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import Topbar from "./Scenes/global/topbar";
import SideBar from "./Scenes/global/sidebar";
import { useState } from "react";

// interface typeProps{
// isSideBar:boolean
// }



function App() {
  // const [count, setCount] = useState(0)
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState<boolean>(true);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="App" style={{ display: "flex", height: "100vh" }}>
  <SideBar isSidebar={isSidebar} />
  <main className="content" style={{ flex: 1, overflow: "auto" }}>
    <Topbar setIsSidebar={setIsSidebar} />
    <Routes>
      <Route path="/" element={<Dashboard />} />
    </Routes>
  </main>
</div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
