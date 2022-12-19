///-- CONFIG --///
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

///-- START --///
const LevelsSlide = ({
  bigScreen,
  setBigScreen,
  setSkip,
  levels,
  setLevel,
  levelTitle,
  setLevelTitle,
  setLevelContext,
  cops,
  setDisplayContext,
  setDisplayInfo,
  game,
  setDisplayAys,
  displayLevels,
  setDisplayLevels,
}) => {
  ///-- STATES --///
  const [searchLvl, setSearchLvl] = useState("");
  const [gameDiv, setGameDiv] = useState("none");

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

  //-- levelSetter
  const levelSetter = (lvl) => {
    if (lvl === "TUTO") {
      setSkip(false);
      const tuto1 = {
        pattern: [
          ".........",
          "WWWWWWWWW",
          "WB..W...W",
          "W...W.P.W",
          "WWHWW...E",
          "W.....p.W",
          "W.......W",
          "WWWWWWWWW",
          ".........",
        ],
        name: "TUTO 1",
        context: "POSEZ LA BOITE SUR LA PLAQUE DE PRESSION POUR SORTIR",
      };
      setLevel(tuto1.pattern);
      setLevelTitle(tuto1.name);
      setLevelContext(tuto1.context);
      setDisplayContext(true);
    } else {
      setSkip(true);
      setLevel(lvl.pattern);
      setLevelTitle(lvl.name);
      if (lvl.context) {
        setLevelContext(lvl.context);
      } else {
        setLevelContext("aucune information");
      }
      setBigScreen(true);
    }
  };

  //-- displayLevelsToggler
  const displayLevelsToggler = () => {
    if (displayLevels === true) {
      setDisplayLevels(false);
    } else {
      setDisplayContext(false);
      setDisplayInfo(false);
      setDisplayLevels(true);
    }
  };

  //-- gameToEdit
  const gameToEdit = () => {
    if (game[0] === "Playing...") {
      setDisplayAys("editor");
    } else {
      navigate("/editor");
    }
  };

  ///-- USEEFFECT --///
  useEffect(() => {}, [levels]);

  ///-- RENDER --///
  return (
    <section
      onMouseLeave={() => setDisplayLevels(false)}
      style={
        location.pathname !== "/game/game" || !bigScreen
          ? { display: "none" }
          : { display: "inherit" }
      }
    >
      <div
        className={displayLevels ? "levelsSlide" : "levelsSlide2"}
        style={!bigScreen ? { top: "calc(50% - 10rem" } : {}}
      >
        <button
          className={
            game[0] !== "Playing..." ? "burgerMenuSlide" : "burgerMenuSlide2"
          }
          style={
            displayLevels
              ? { paddingLeft: "0.3rem", backgroundColor: "black" }
              : levelTitle === "SALUTATIONS!" && cops.length === 0
              ? { animation: "pulseTitle 0.5s infinite" }
              : {}
          }
          onClick={() => {
            displayLevelsToggler();
          }}
        >
          {displayLevels ? "<" : ">"}
        </button>
        {gameDiv === "none" ? (
          <div className="presTitlesContainer">
            <div>
              <button
                className="headerGameTitle"
                onClick={() => levelSetter("TUTO")}
              >
                <h3>TUTO</h3>
              </button>
            </div>
            <div>
              <button
                className="headerGameTitle"
                onClick={() => gamDivDefiner("validé")}
              >
                <h3>NIVEAUX VALIDES!</h3>
              </button>
            </div>
            <div>
              <button
                className="headerGameTitle"
                onClick={() => gamDivDefiner("à tester")}
              >
                <h3>NIVEAUX A VéRIFIER...</h3>
              </button>
            </div>
            <div>
              <button
                className="headerGameTitle"
                onClick={() => gamDivDefiner("rechercher")}
              >
                <h3>CHERCHER UN NIVEAU</h3>
              </button>
            </div>
            <div>
              <button
                className="headerGameTitleEdit"
                onClick={() => {
                  gameToEdit();
                }}
              >
                <h3>EDITER UN NIVEAU</h3>
              </button>
            </div>
            <div>
              <button className="headerGameTitleInact" onClick={() => {}}>
                <h3>CONNEXION (inactif)</h3>
              </button>
            </div>
          </div>
        ) : (
          <div className="levelsCategories">
            <div className="headerGameTitles2">
              <button
                className="headerGameTitle2"
                style={
                  gameDiv === "validé"
                    ? { backgroundColor: "black", color: "rgba(234, 178, 11)" }
                    : {}
                }
                onClick={() => gamDivDefiner("validé")}
              >
                V
              </button>
              <button
                className="headerGameTitle2"
                style={
                  gameDiv === "à tester"
                    ? { backgroundColor: "black", color: "rgba(234, 178, 11)" }
                    : {}
                }
                onClick={() => gamDivDefiner("à tester")}
              >
                N
              </button>
              <button
                className="headerGameTitle2"
                style={
                  gameDiv === "rechercher"
                    ? { backgroundColor: "black", color: "rgba(234, 178, 11)" }
                    : {}
                }
                onClick={() => gamDivDefiner("rechercher")}
              >
                R
              </button>
              <button
                className="headerGameTitle2"
                onClick={() => gamDivDefiner("none")}
              >
                B
              </button>
              <div className="headerGameTitle"></div>
            </div>
            {levels.length === 0 ? (
              <div className="headerGameDivs">
                <h3
                  className="loadingText"
                  style={{
                    width: "8rem",
                    height: "12rem",
                    marginLeft: "1rem",
                    textAlign: "center",
                    marginRight: "1rem",
                    backgroundColor: "rgba(0, 0, 0, 0.4)",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  RéCUPéRATION DES NIVEAUX, CELA PEUT PRENDRE QUELQUES
                  SECONDES...
                </h3>
              </div>
            ) : (
              <div className="headerGameDivs">
                {gameDiv === "validé" && (
                  <div className="headerGameDiv">
                    {levels.map((lvl, index) => {
                      if (lvl.status === "valid") {
                        return (
                          <button
                            className="levelSelectorValid"
                            onClick={() => {
                              levelSetter(lvl);
                            }}
                            key={index}
                          >
                            <h3>{lvl.name}</h3>
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
                              levelSetter(lvl);
                            }}
                            key={index}
                          >
                            <h3>{lvl.name}</h3>
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
                      className="levelSearchInput"
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
                              levelSetter(lvl);
                            }}
                            key={index}
                          >
                            <h3>{lvl.name}</h3>
                          </button>
                        );
                      })}
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default LevelsSlide;
