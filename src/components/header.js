///-- CONFIG --///
//-- import librairie
import { useLocation, useNavigate } from "react-router-dom";

///-- START --///
const Header = ({ theme, setTheme, setDisplayAys, game }) => {
  ///-- STATES --///
  //- none

  const navigate = useNavigate();
  const location = useLocation();

  ///-- FONCTIONS --///
  const navigater = (to) => {
    if (to === "home") {
      if (game[0] === "Playing..." || game[0] === "Pause...") {
        setDisplayAys("home");
      } else {
        navigate("/");
      }
    } else if (to === "editor") {
      if (game[0] === "Playing..." || game[0] === "Pause...") {
        setDisplayAys("editor");
      } else {
        navigate("/editor");
      }
    }
  };

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
            navigater("home");
          }}
        >
          <h3 style={{ pointerEvents: "none" }}>HOME</h3>
        </button>
      )}
      {location.pathname !== "/game/game" && (
        <button
          className="navButton"
          onClick={() => {
            navigate("/game/game");
          }}
        >
          <h3>PLAY BUZZLE!</h3>
        </button>
      )}
      {location.pathname !== "/editor" &&
        location.pathname !== "/game/editor" && (
          <button
            className="navButton"
            onClick={() => {
              navigater("editor");
            }}
          >
            <h3>EDIT</h3>
          </button>
        )}
    </header>
  );
};

export default Header;
