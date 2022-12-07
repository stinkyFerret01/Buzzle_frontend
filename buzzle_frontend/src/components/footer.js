///-- CONFIG --///
//-- import librairie
import { useNavigate } from "react-router-dom";

///-- START --///
const Footer = () => {
  const navigate = useNavigate();

  ///-- RENDER --///
  return (
    <footer>
      <section className="connection">
        <button onClick={() => navigate("/")}>home</button>
      </section>
      <section className="chooseLevel">
        <button onClick={() => navigate("/game")}>game</button>
      </section>
      <section className="chooseLevel">
        <button onClick={() => navigate("/editor")}>editor</button>
      </section>
    </footer>
  );
};

export default Footer;
