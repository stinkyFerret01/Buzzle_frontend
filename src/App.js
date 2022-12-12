///-- CONFIG --///
//-- import style et librairie
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";

//-- import des composants
import Header from "./components/header";
// import BurgerMenu from "./components/burgerMenu";
import HomePage from "./components/homePage";
import GamePage from "./components/gamePage";
import EditorPage from "./components/editorPage";
import Footer from "./components/footer";
import AreYouSure from "./components/areYouSure";
import WaitForResponse from "./components/waitForResponse";

///-- START --///
function App() {
  ///-- STATES --///
  const online = "https://buzzlebackend.onrender.com";
  const local = "http://localhost:3000";
  const [backend] = useState(online || local);
  const [theme, setTheme] = useState("dark");
  // const [pData, setPData] = useState("none");
  const [level, setLevel] = useState("none");
  const [edited, setEdited] = useState(["none", "none", "new"]);
  const [editBase, setEditBase] = useState("none");
  const [displayAys, setDisplayAys] = useState("none");
  const [displayWfr, setDisplayWfr] = useState(false);
  const [bigScreen, setBigScreen] = useState(false);

  ///-- RENDER --///
  return (
    <div
      className="App"
      style={theme === "clear" ? { backgroundColor: "purple" } : {}}
    >
      <Router>
        {bigScreen === false && (
          <Header
            backend={backend}
            theme={theme}
            setTheme={setTheme}
            setLevel={setLevel}
            edited={edited}
            setDisplayAys={setDisplayAys}
            displayWfr={displayWfr}
            setDisplayWfr={setDisplayWfr}
          />
        )}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/game/:from"
            element={
              <GamePage
                level={level}
                setLevel={setLevel}
                bigScreen={bigScreen}
                setBigScreen={setBigScreen}
              />
            }
          />
          <Route
            path="/editor"
            element={
              <EditorPage
                setLevel={setLevel}
                edited={edited}
                setEdited={setEdited}
                editBase={editBase}
                setEditBase={setEditBase}
                bigScreen={bigScreen}
                setBigScreen={setBigScreen}
              />
            }
          />
        </Routes>
        {bigScreen === false && <Footer />}
        {displayAys !== "none" && (
          <AreYouSure displayAys={displayAys} setDisplayAys={setDisplayAys} />
        )}
        {displayWfr === true && (
          <WaitForResponse setDisplayWfr={setDisplayWfr} />
        )}
      </Router>
    </div>
  );
}

export default App;
