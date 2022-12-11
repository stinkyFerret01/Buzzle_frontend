///-- CONFIG --///
//-- import librairie
import { useNavigate } from "react-router-dom";
///-- START --///
const HomePage = () => {
  const navigate = useNavigate();
  ///-- RENDER --///
  return (
    <main className="homePage">
      <div className="presVidsDisplay">
        <div className="presVidDisplay" onClick={() => navigate("/game/game")}>
          <h3>PLAY!</h3>
          <video width="220" height="130" loop autoPlay muted>
            <source src="../Videos/presVid.mp4" type="video/mp4" />
          </video>
        </div>
        <div className="presVidDisplay" onClick={() => navigate("/editor")}>
          <h3>EDIT!</h3>
          <video width="220" height="130" loop autoPlay muted>
            <source src="../Videos/presVidEdit.mp4" type="video/mp4" />
          </video>
        </div>
      </div>

      <button className="homeToGame" onClick={() => navigate("/game/game")}>
        <h1>PLAY BUZZLE NOW!</h1>
      </button>
    </main>
  );
};

export default HomePage;
