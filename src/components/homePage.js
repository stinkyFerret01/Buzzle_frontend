///-- CONFIG --///
//-- import librairie
import { useNavigate } from "react-router-dom";
///-- START --///
const HomePage = () => {
  const navigate = useNavigate();
  ///-- RENDER --///
  return (
    <main className="homePage">
      <button className="homeToGame" onClick={() => navigate("/game/game")}>
        <h1>PLAY BUZZLE NOW!</h1>
      </button>
      <button onClick={() => {}}>se connecter (inactif)</button>
    </main>
  );
};

export default HomePage;
