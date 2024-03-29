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
import ConnectForm from "./components/conncetForm";

///-- START --///
function App() {
  ///-- STATES --///
  const online = "https://buzzlebackend.onrender.com";
  const local = "http://localhost:3000";
  const [backend] = useState(online || local);
  const [theme, setTheme] = useState("clear");
  // const [pData, setPData] = useState("none");
  const [levels, setLevels] = useState([]);
  const [level, setLevel] = useState("none");
  const [levelTitle, setLevelTitle] = useState("");
  const [levelContext, setLevelContext] = useState("");
  const [game, setGame] = useState(["Ready?", "START"]);
  const [edited, setEdited] = useState(["none", "none", "new"]);
  const [editBase, setEditBase] = useState("none");
  const [displayAys, setDisplayAys] = useState("none");
  const [displayWfr, setDisplayWfr] = useState("none");
  const [displayLevels, setDisplayLevels] = useState(false);
  const [bigScreen, setBigScreen] = useState(false);
  const [displayRotate, setDisplayRotate] = useState(true);
  const [skip, setSkip] = useState(false);
  const [displayLevelsNews, setDisplayLevelsNews] = useState(false);
  const [displayConnectForm, setDisplayConnectForm] = useState(false);
  const [displayAudio, setDisplayAudio] = useState(false);
  displayAudio && setDisplayAudio(true);

  //-- USEEFFECT
  //-- fetcher (requete au backend pour récupérer les niveaux)
  useEffect(() => {
    const fetcher = async () => {
      try {
        const response = await axios.get(`${backend}/levels`);
        setLevels(response.data.levels);
        if (displayLevelsNews === true) {
          setDisplayWfr([
            "levels ok",
            "CA Y EST!",
            "LES NIVEAUX SONT DISPONIBLES! RETROUVEZ LES DANS LE MENU A GAUCHE DE LA PAGE GAME",
            "FERMER",
          ]);
        }
      } catch (error) {}
    };
    if (levels.length === 0) {
      fetcher();
    }
  }, [backend, levels, setLevels, displayLevelsNews]);

  //-- screenSetter
  useEffect(() => {
    setBigScreen(true);
  }, [setBigScreen]);

  ///-- RENDER --///
  return (
    <div
      className="App"
      style={
        theme === "clear" ? { backgroundColor: " rgba(234, 178, 11, 1)" } : {}
      }
    >
      <Router>
        {bigScreen === false && (
          <Header
            backend={backend}
            theme={theme}
            setTheme={setTheme}
            game={game}
            levels={levels}
            setLevels={setLevels}
            setLevel={setLevel}
            edited={edited}
            setDisplayAys={setDisplayAys}
            displayWfr={displayWfr}
            setDisplayWfr={setDisplayWfr}
            displayConnectForm={displayConnectForm}
            setDisplayConnectForm={setDisplayConnectForm}
          />
        )}
        <Routes>
          <Route
            path="/"
            element={
              <HomePage
                bigScreen={bigScreen}
                setBigScreen={setBigScreen}
                setDisplayLevelsNews={setDisplayLevelsNews}
                setTheme={setTheme}
                skip={skip}
                setSkip={setSkip}
                setLevel={setLevel}
              />
            }
          />
          <Route
            path="/game/:from"
            element={
              <GamePage
                backend={backend}
                skip={skip}
                setSkip={setSkip}
                level={level}
                setLevel={setLevel}
                levelTitle={levelTitle}
                setLevelTitle={setLevelTitle}
                levelContext={levelContext}
                setLevelContext={setLevelContext}
                levels={levels}
                setLevels={setLevels}
                game={game}
                setGame={setGame}
                edited={edited}
                setDisplayAys={setDisplayAys}
                setDisplayWfr={setDisplayWfr}
                displayLevels={displayLevels}
                setDisplayLevels={setDisplayLevels}
                bigScreen={bigScreen}
                setBigScreen={setBigScreen}
                displayRotate={displayRotate}
                setDisplayRotate={setDisplayRotate}
              />
            }
          />
          <Route
            path="/editor"
            element={
              <EditorPage
                backend={backend}
                setLevel={setLevel}
                setLevelTitle={setLevelTitle}
                setLevelContext={setLevelContext}
                levels={levels}
                setLevels={setLevels}
                edited={edited}
                setEdited={setEdited}
                editBase={editBase}
                setEditBase={setEditBase}
                setDisplayWfr={setDisplayWfr}
                setDisplayAys={setDisplayAys}
                bigScreen={bigScreen}
                setBigScreen={setBigScreen}
                displayRotate={displayRotate}
                setDisplayRotate={setDisplayRotate}
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
            game={game}
          />
        )}
        {displayWfr !== "none" && (
          <WaitForResponse
            displayWfr={displayWfr}
            setDisplayWfr={setDisplayWfr}
          />
        )}
        {displayConnectForm === true && (
          <ConnectForm
            displayConnectForm={displayConnectForm}
            setDisplayConnectForm={setDisplayConnectForm}
          />
        )}
        {displayAudio === true ||
          (bigScreen === false && (
            <div className="audio-wrapper">
              <audio
                width="10000"
                className="audioPlayer"
                src="../Audio/Stranger-things-124008.mp3"
                type="audio/mp3"
                controls
                // muted
                loop
                autoPlay
              />
            </div>
          ))}
      </Router>
    </div>
  );
}

export default App;

// Music by <a href="https://pixabay.com/fr/users/music_unlimited-27600023/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=music&amp;utm_content=124008">Music_Unlimited</a> from <a href="https://pixabay.com/music//?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=music&amp;utm_content=124008">Pixabay</a>
