///-- CONFIG --///
//-- import librairie
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

//-- import media
// import videoPlay from "./Media/presVid.mp4";
// import videoPlay2 from "./Media/presVidEdit.mp4";
import videoTuto from "./Media/videoTuto.mp4";
import videoEdit from "./Media/videoEdit.mp4";

///-- START --///
const HomePage = ({
  bigScreen,
  setBigScreen,
  setTheme,
  setDisplayLevelNews,
  setSkip,
  setLevel,
}) => {
  ///-- STATES --///
  const [welcomeSentence, setWelcomeSentence] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const welcomeSentences = [
      "TO BUG OR NOT TO BUG...",
      "BETTER THAN TIC-TAC-TOE!",
      "TRY IT ON PC!",
      "THINK OUTSIDE THE BOX!",
      "TRY IT ON MOBILE!",
      "ARE YOU A ROBOT?",
    ];
    const sentenceDefiner = () => {
      let index = Math.floor(Math.random() * welcomeSentences.length);
      let sentence = welcomeSentences[index];
      setWelcomeSentence(sentence);
    };
    sentenceDefiner();
  }, []);

  //-- USEEFFECT
  useEffect(() => {
    setBigScreen(false);
  }, [setBigScreen]);

  ///-- RENDER --///
  return (
    <main className={bigScreen ? "homePage" : "homePage2"}>
      {bigScreen && (
        <div className="homeMessage">
          <h3 className="noHovText">
            A{" "}
            <span className="homeStinky">
              STINKY FERR<span className="homeLetter11">E</span>T
            </span>{" "}
            GAME
          </h3>
        </div>
      )}
      <div className="presVidsDisplay">
        <button
          className="homeToGame"
          onClick={() => {
            setLevel("none");
            navigate("/game/game");
            setTheme("dark");
            setSkip(true);
            setDisplayLevelNews(true);
          }}
        >
          <h3 style={{ fontSize: "18px" }}>PLAY BUZZLE NOW!</h3>
        </button>
        <div
          className="presVidDisplay"
          onClick={() => {
            navigate("/game/game");
            setSkip(false);
            setTheme("dark");
            setDisplayLevelNews(true);
          }}
        >
          <h3>TUTO!</h3>
          <video width="220" height="130" loop autoPlay muted>
            <source src={videoTuto} type="video/mp4" />
          </video>
        </div>
        <div
          className="presVidDisplay2"
          onClick={() => {
            navigate("/editor");
            setTheme("dark");
            setDisplayLevelNews(true);
            setSkip(true);
          }}
        >
          <h3>EDIT!</h3>
          <video width="220" height="130" loop autoPlay muted>
            <source src={videoEdit} type="video/mp4" />
          </video>
        </div>
      </div>
      {bigScreen && (
        <div className="homeMessage">
          <h3 className="welcomeSentence">{welcomeSentence}</h3>
        </div>
      )}
    </main>
  );
};

export default HomePage;
