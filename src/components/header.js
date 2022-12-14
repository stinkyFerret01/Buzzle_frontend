///-- CONFIG --///
//-- import librairie
import { useLocation, useNavigate } from "react-router-dom";

///-- START --///
const Header = ({ theme, setTheme, setDisplayAys }) => {
  ///-- STATES --///
  //- none

  const navigate = useNavigate();
  const location = useLocation();

  ///-- FONCTIONS --///
  //- none

  ///-- RENDER --///
  return (
    <header>
      <section className="headerSection">
        <button onClick={() => {}}>se connecter (inactif)</button>
        <button
          onClick={() => {
            if (theme === "clear") {
              setTheme("dark");
            } else {
              setTheme("clear");
            }
          }}
        >
          THEME
        </button>
      </section>
      {location.pathname !== "/" && (
        <button
          className="navButton"
          onClick={() => {
            setDisplayAys("home");
          }}
        >
          <h3 style={{ pointerEvents: "none" }}>HOME</h3>
        </button>
      )}
      {location.pathname !== "/game/game" && (
        <button
          className="navButton"
          onClick={
            location.pathname === "/"
              ? () => navigate("/game/game")
              : () => setDisplayAys("game/game")
          }
        >
          <h3>PLAY BUZZLE!</h3>
        </button>
      )}
      <button
        className="navButton"
        onClick={
          location.pathname === "/"
            ? () => navigate("/editor")
            : () => setDisplayAys("editor")
        }
      >
        <h3>EDIT</h3>
      </button>
    </header>
  );
};

export default Header;
