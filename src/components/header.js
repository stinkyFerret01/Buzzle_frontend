///-- CONFIG --///
//-- import librairie
// import axios from "axios";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

///-- START --///
const Header = ({
  // backend,
  theme,
  setTheme,
  levels,
  // setLevels,
  setLevel,
  // edited,
  setDisplayAys,
  // setDisplayWfr,
}) => {
  ///-- STATES --///

  const [searchLvl, setSearchLvl] = useState("");
  const [gameDiv, setGameDiv] = useState("validé");
  const searchedLevels = levels.filter(
    (lvl) => lvl.name.toUpperCase().indexOf(searchLvl.toUpperCase()) >= 0
  );

  const navigate = useNavigate();
  const location = useLocation();

  ///-- FONCTIONS --///
  ///-- gameDivDefiner
  const gamDivDefiner = (div) => {
    if (div !== gameDiv) {
      setGameDiv(div);
    }
  };

  //-- USEEFFECT
  useEffect(() => {}, [levels, searchLvl]);

  ///-- RENDER --///
  return (
    <header>
      {/* LEFT */}
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
        <section
          onClick={() => {
            setDisplayAys("");
          }}
          style={{ left: "0%" }}
          className="headerSectionGhost"
        >
          <h1>HOME</h1>
        </section>
      )}
      {/* CENTER */}
      <section className="headerSection">
        {levels.length > 0 ? (
          <div className="headerGame">
            <div className="headerGameTitles">
              <button
                className="headerGameTitle"
                style={gameDiv === "validé" ? { backgroundColor: "black" } : {}}
                onClick={() => gamDivDefiner("validé")}
              >
                validé
              </button>
              <button
                className="headerGameTitle"
                style={
                  gameDiv === "à tester" ? { backgroundColor: "black" } : {}
                }
                onClick={() => gamDivDefiner("à tester")}
              >
                à tester
              </button>
              <button
                className="headerGameTitle"
                style={
                  gameDiv === "rechercher" ? { backgroundColor: "black" } : {}
                }
                onClick={() => gamDivDefiner("rechercher")}
              >
                rechercher
              </button>
              <div className="headerGameTitle"></div>
            </div>
            <div className="headerGameDivs">
              {gameDiv === "validé" && (
                <div className="headerGameDiv">
                  {levels.map((lvl, index) => {
                    if (lvl.status === "valid") {
                      return (
                        <button
                          className="levelSelectorValid"
                          onClick={() => {
                            setLevel(lvl.pattern);
                          }}
                          key={index}
                        >
                          {lvl.name}
                        </button>
                      );
                    } else {
                      return <div key={index}></div>;
                    }
                  })}
                </div>
              )}
              {gameDiv === "à tester" && (
                <div className="headerGameDiv">
                  {levels.map((lvl, index) => {
                    if (lvl.status === "new") {
                      return (
                        <button
                          className="levelSelectorNew"
                          onClick={() => {
                            setLevel(lvl.pattern);
                          }}
                          key={index}
                        >
                          {lvl.name}
                        </button>
                      );
                    } else {
                      return <div key={index}></div>;
                    }
                  })}
                </div>
              )}
              {gameDiv === "rechercher" && (
                <div className="headerGameDiv">
                  <input
                    className="textincome"
                    name="searchLvl"
                    type="text"
                    placeholder="chercher un niveau"
                    value={searchLvl}
                    onChange={(event) => {
                      setSearchLvl(event.target.value);
                    }}
                  />
                  {searchedLevels.length > 0 &&
                    searchedLevels.map((lvl, index) => {
                      return (
                        <button
                          className="levelSelectorSearch"
                          onClick={() => {
                            setLevel(lvl.pattern);
                          }}
                          key={index}
                        >
                          {lvl.name}
                        </button>
                      );
                    })}
                </div>
              )}
            </div>
          </div>
        ) : (
          <div style={{ color: "white" }}>
            Niveaux en chargement, cela peut prendre quelques secondes...
          </div>
        )}
      </section>
      {location.pathname !== "/game/game" && (
        <section
          onClick={
            location.pathname === "/"
              ? () => navigate("/game/game")
              : () => setDisplayAys("game/game")
          }
          style={{ left: "33.33%" }}
          className="headerSectionGhost"
        >
          <h1>PLAY BUZZLE!</h1>
        </section>
      )}
      {/* RIGHT */}
      <section className="headerSection">
        {/* {edited[0] !== "none" && edited[1].length > 2 && (
          <button className="headerEditButton" onClick={editer}>
            EDIT
          </button>
        )} */}
      </section>
      {location.pathname !== "/editor" &&
        location.pathname !== "/game/editor" && (
          <section
            onClick={
              location.pathname === "/"
                ? () => navigate("/editor")
                : () => setDisplayAys("editor")
            }
            style={{ left: "66.66%" }}
            className="headerSectionGhost"
          >
            <h1>LEVEL EDITOR</h1>
          </section>
        )}
    </header>
  );
};

export default Header;
