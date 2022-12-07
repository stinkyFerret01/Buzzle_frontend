///-- CONFIG --///
//-- import librairie
import { useNavigate } from "react-router-dom";
///-- START --///
const HomePage = () => {
  const navigate = useNavigate();
  ///-- RENDER --///
  return (
    <main>
      <button onClick={() => navigate("/game")}>game</button>
    </main>
  );
};

export default HomePage;
