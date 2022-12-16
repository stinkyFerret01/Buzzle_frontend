///-- CONFIG --///
//-- import librairie
import { useLocation, useNavigate } from "react-router-dom";

///-- START --///
const Header = ({ theme, setTheme, setDisplayAys, game }) => {
  ///-- STATES --///
  //- none

  const navigate = useNavigate();
  const location = useLocation();

  const vidSides1 = [
    "../Videos/presVid.mp4",
    "../Videos/presVid.mp4",
    "../Videos/presVid.mp4",
    "../Videos/presVid.mp4",
  ];
  const vidSides2 = [
    "../Videos/presVid.mp4",
    "../Videos/presVid.mp4",
    "../Videos/presVid.mp4",
    "../Videos/presVid.mp4",
  ];

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
      <section className="headerSectionSides">
        {vidSides1.map((vid, index) => {
          return (
            <video width="50" height="22" loop autoPlay muted key={index}>
              <source src={vid} type="video/mp4" />
            </video>
          );
        })}
      </section>
      <section className="headerConnectAndNav">
        <button className="headerConnectionButton" onClick={() => {}}>
          SE CONNECTER (inactif)
        </button>
        <div className="headerNav">
          {location.pathname !== "/" && (
            <button
              className="headerNavButton"
              onClick={() => {
                navigater("home");
              }}
            >
              <h3 style={{ pointerEvents: "none" }}>H</h3>
            </button>
          )}
          {location.pathname !== "/game/game" && (
            <button
              className="headerNavButton"
              onClick={() => {
                navigate("/game/game");
              }}
            >
              <h3>P</h3>
            </button>
          )}
          {location.pathname !== "/editor" &&
            location.pathname !== "/game/editor" && (
              <button
                className="headerNavButton"
                onClick={() => {
                  navigater("editor");
                }}
              >
                <h3>E</h3>
              </button>
            )}
        </div>
      </section>
      <section className="headerTitle">
        <button
          className="headerTitleButton"
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
      <section className="headerOptions">
        <div className="optionCreator">
          <div className="creatorPromo">
            <h3 className="creatorPromoTitle">DéVELOPPEUR:</h3>
            <nav className="creatorNav">
              <a
                target="_blank"
                href="https://www.lereacteur.io"
                rel="noreferrer"
              >
                <img
                  className="creatorLogo"
                  src="../Images/logo-reacteur copie.jpeg"
                  alt="logo"
                />
              </a>
              <a
                target="_blank"
                href="https://www.linkedin.com/in/christophe-lafon-549788243"
                rel="noreferrer"
              >
                <img
                  className="creatorLogo"
                  src="../Images/logo-linkedin copie.png"
                  alt="logo"
                />
              </a>
              <a
                target="_blank"
                href="https://github.com/stinkyFerret01"
                rel="noreferrer"
              >
                <img
                  className="creatorLogo"
                  src="../Images/github copie.png"
                  alt="logo"
                />
              </a>
            </nav>
          </div>
          <div className="otherCreations"></div>
        </div>
        <button className="optionSite">OPTIONS (inactif)</button>
      </section>
      <section className="headerSectionSides">
        {vidSides2.map((vid, index) => {
          return (
            <video width="50" height="22" loop autoPlay muted key={index}>
              <source src={vid} type="video/mp4" />
            </video>
          );
        })}
      </section>
      <section className="headerSection"></section>
    </header>
  );
};

export default Header;
