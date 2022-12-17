///-- CONFIG --///
//-- import librairie
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import titleBg1 from "./Media/backgroundTitle1.png";
import titleBg2 from "./Media/backgroundTitle2.png";
import titleBg3 from "./Media/backgroundTitle3.png";
import videoPlay from "./Media/presVid.mp4";
import videoPlay2 from "./Media/presVidEdit.mp4";
///-- START --///
const Header = ({ theme, setTheme, setDisplayAys, game }) => {
  ///-- STATES --///
  const [titleBgCounter, setTitleBgCounter] = useState(1);

  const navigate = useNavigate();
  const location = useLocation();

  const vidSides1 = [videoPlay, videoPlay2, videoPlay, videoPlay2];
  const vidSides2 = [videoPlay, videoPlay2, videoPlay, videoPlay2];

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

  ///-- USEEFFECT --///
  useEffect(() => {
    const counterAdder = () => {
      console.log(titleBgCounter);
      if (titleBgCounter !== 3) {
        setTitleBgCounter(titleBgCounter + 1);
      } else {
        setTitleBgCounter(1);
      }
    };
    setTimeout(counterAdder, 1000);
  }, [titleBgCounter]);

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
          <h3>SE CONNECTER (inactif)</h3>
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
          {titleBgCounter === 1 && (
            <img className="titleBg" src={titleBg1} alt="background spatial" />
          )}
          {titleBgCounter === 2 && (
            <img className="titleBg" src={titleBg2} alt="background spatial" />
          )}
          {titleBgCounter === 3 && (
            <img className="titleBg" src={titleBg3} alt="background spatial" />
          )}
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
        <button className="optionSite">
          <h3>OPTIONS (inactif)</h3>
        </button>
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
