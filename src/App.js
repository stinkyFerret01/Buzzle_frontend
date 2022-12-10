///-- CONFIG --///
//-- import style et librairie
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";

//-- import des composants
import Header from "./components/header";
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
  // const [pData, setPData] = useState("none");
  const [level, setLevel] = useState("none");
  const [edited, setEdited] = useState(["none", "none", "new"]);
  const [editBase, setEditBase] = useState("none");
  const [displayAys, setDisplayAys] = useState("none");
  const [displayWfr, setDisplayWfr] = useState(false);

  ///-- RENDER --///
  return (
    <div className="App">
      <Router>
        <Header
          backend={backend}
          setLevel={setLevel}
          edited={edited}
          setDisplayAys={setDisplayAys}
          displayWfr={displayWfr}
          setDisplayWfr={setDisplayWfr}
        />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/game/:from"
            element={<GamePage level={level} setLevel={setLevel} />}
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
              />
            }
          />
        </Routes>
        <Footer />
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
