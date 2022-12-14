///-- CONFIG --///
//-- import style et librairie
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

//-- import des composants
import Header from "./components/header";
// import BurgerMenu from "./components/burgerMenu";
import HomePage from "./components/homePage";
import GamePage from "./components/gamePage";
import EditorPage from "./components/editorPage";
import Footer from "./components/footer";
import AreYouSure from "./components/areYouSure";
import WaitForResponse from "./components/waitForResponse";
import LevelsSlide from "./components/levelsSlide";

///-- START --///
function App() {
  ///-- STATES --///
  const online = "https://buzzlebackend.onrender.com";
  const local = "http://localhost:3000";
  const [backend] = useState(online || local);
  const [theme, setTheme] = useState("dark");
  // const [pData, setPData] = useState("none");
  const [levels, setLevels] = useState([]);
  const [level, setLevel] = useState("none");
  const [edited, setEdited] = useState(["none", "none", "new"]);
  const [editBase, setEditBase] = useState("none");
  const [displayAys, setDisplayAys] = useState("none");
  const [displayWfr, setDisplayWfr] = useState(false);
  const [displayLevels, setDisplayLevels] = useState(false);
  const [bigScreen, setBigScreen] = useState(false);

  //-- USEEFFECT
  //-- fetcher (requete au backend pour récupérer les niveaux)
  useEffect(() => {
    const fetcher = async () => {
      try {
        const response = await axios.get(`${backend}/levels`);
        setLevels(response.data.levels);
      } catch (error) {}
    };
    fetcher();
  }, [backend, setLevels]);

  ///-- RENDER --///
  return (
    <div
      className="App"
      style={theme === "clear" ? { backgroundColor: "purple" } : {}}
    >
      <Router>
        <div className="audio">
          {/* <iframe
            src="../Audio/Stranger-things-124008.mp3"
            allow="autoplay"
            id="audio"
            hidden
          ></iframe> */}
        </div>
        {bigScreen === false && (
          <Header
            backend={backend}
            theme={theme}
            setTheme={setTheme}
            levels={levels}
            setLevels={setLevels}
            setLevel={setLevel}
            edited={edited}
            setDisplayAys={setDisplayAys}
            displayWfr={displayWfr}
            setDisplayWfr={setDisplayWfr}
          />
        )}
        <LevelsSlide
          level={level}
          setLevel={setLevel}
          levels={levels}
          setLevels={setLevels}
          setBigScreen={setBigScreen}
          displayLevels={displayLevels}
          setDisplayLevels={setDisplayLevels}
          setDisplayAys={setDisplayAys}
        />
        <audio
          className="audioPlayer"
          src="../Audio/Stranger-things-124008.mp3"
          type="audio/mp3"
          controls
          // muted
          loop
          autoPlay
        />
        <Routes>
          <Route path="/" element={<HomePage setBigScreen={setBigScreen} />} />
          <Route
            path="/game/:from"
            element={
              <GamePage
                backend={backend}
                level={level}
                setLevel={setLevel}
                setDisplayWfr={setDisplayWfr}
                displayLevels={displayLevels}
                setDisplayLevels={setDisplayLevels}
                bigScreen={bigScreen}
                setBigScreen={setBigScreen}
              />
            }
          />
          <Route
            path="/editor"
            element={
              <EditorPage
                backend={backend}
                setLevel={setLevel}
                edited={edited}
                setEdited={setEdited}
                editBase={editBase}
                setEditBase={setEditBase}
                setDisplayWfr={setDisplayWfr}
                setDisplayAys={setDisplayAys}
                bigScreen={bigScreen}
                setBigScreen={setBigScreen}
              />
            }
          />
        </Routes>
        {bigScreen === false && <Footer />}
        {displayAys !== "none" && (
          <AreYouSure
            setLevel={setLevel}
            setBigScreen={setBigScreen}
            displayAys={displayAys}
            setDisplayAys={setDisplayAys}
          />
        )}
        {displayWfr === true && (
          <WaitForResponse setDisplayWfr={setDisplayWfr} />
        )}
      </Router>
    </div>
  );
}

export default App;

// Music by <a href="https://pixabay.com/fr/users/music_unlimited-27600023/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=music&amp;utm_content=124008">Music_Unlimited</a> from <a href="https://pixabay.com/music//?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=music&amp;utm_content=124008">Pixabay</a>
