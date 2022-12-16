///-- CONFIG --///
//-- import librairie
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

///-- START --///
const HomePage = ({ setBigScreen }) => {
  const navigate = useNavigate();

  //-- USEEFFECT
  useEffect(() => {
    setBigScreen(false);
  }, [setBigScreen]);

  ///-- RENDER --///
  return (
    <main className="homePage">
      <div className="presVidsDisplay">
        <button className="homeToGame" onClick={() => navigate("/game/game")}>
          <h3 style={{ fontSize: "18px" }}>PLAY BUZZLE NOW!</h3>
        </button>
        <div className="presVidDisplay" onClick={() => navigate("/game/game")}>
          <h3>PLAY!</h3>
          <video width="220" height="130" loop autoPlay muted>
            <source src="../Videos/presVid.mp4" type="video/mp4" />
          </video>
        </div>
        <div className="presVidDisplay2" onClick={() => navigate("/editor")}>
          <h3>EDIT!</h3>
          <video width="220" height="130" loop autoPlay muted>
            <source src="../Videos/presVidEdit.mp4" type="video/mp4" />
          </video>
        </div>
      </div>
    </main>
  );
};

export default HomePage;
