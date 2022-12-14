///-- CONFIG --///
import { useState } from "react";
import { useLocation } from "react-router-dom";

///-- START --///
const LevelsSlide = ({
  setBigScreen,
  levels,
  setLevel,
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
  //   const navigate = useNavigate();
  const location = useLocation();

  ///-- FONCTIONS --///
  ///-- gameDivDefiner
  const gamDivDefiner = (div) => {
    if (div !== gameDiv) {
      setGameDiv(div);
    }
  };

  const levelSetter = (pattern) => {
    if (location.pathname !== "/game/game") {
      setDisplayAys(pattern);
    } else {
      const levelSetter = (pattern) => {
        setLevel(pattern);
        setBigScreen(true);
      };
      levelSetter(pattern);
    }
  };

  //-- displayLevelsToggler
  const displayLevelsToggler = () => {
    if (displayLevels === true) {
      setDisplayLevels(false);
    } else {
      setDisplayLevels(true);
    }
  };

  ///-- RENDER --///
  return (
    <section
      onMouseLeave={() => setDisplayLevels(false)}
      style={
        location.pathname !== "/game/game"
          ? { display: "none" }
          : { display: "inherit" }
      }
    >
      <div className={displayLevels ? "levelsSlide" : "levelsSlide2"}>
        <button
          className="burgerMenuSlide"
          onClick={() => {
            displayLevelsToggler();
          }}
        >
          {displayLevels ? "<" : "+"}
        </button>
        {gameDiv === "none" ? (
          <div className="presTitlesContainer">
            <div>
              <button
                className="headerGameTitle"
                onClick={() => gamDivDefiner("validé")}
              >
                NIVEAUX VALIDES!
              </button>
            </div>
            <div>
              <button
                className="headerGameTitle"
                onClick={() => gamDivDefiner("à tester")}
              >
                NIVEAUX NON VERIFIE...
              </button>
            </div>
            <div>
              <button
                className="headerGameTitle"
                onClick={() => gamDivDefiner("rechercher")}
              >
                CHERCHER UN NIVEAU
              </button>
            </div>
            <div>
              <button
                className="headerGameTitleEdit"
                onClick={() => setDisplayAys("editor")}
              >
                EDITER UN NIVEAU
              </button>
            </div>
            <div>
              <button className="headerGameTitleInact" onClick={() => {}}>
                SE CONNECTER (inactif)
              </button>
            </div>
          </div>
        ) : (
          <div className="levelsCategories">
            <div className="headerGameTitles2">
              <button
                className="headerGameTitle2"
                style={
                  gameDiv === "validé" ? { backgroundColor: "orangered" } : {}
                }
                onClick={() => gamDivDefiner("validé")}
              >
                VALIDES
              </button>
              <button
                className="headerGameTitle2"
                style={
                  gameDiv === "à tester" ? { backgroundColor: "orangered" } : {}
                }
                onClick={() => gamDivDefiner("à tester")}
              >
                NOUVEAUX
              </button>
              <button
                className="headerGameTitle2"
                style={
                  gameDiv === "rechercher"
                    ? { backgroundColor: "orangered" }
                    : {}
                }
                onClick={() => gamDivDefiner("rechercher")}
              >
                RECHERCHER
              </button>
              <button
                className="headerGameTitleBack"
                onClick={() => gamDivDefiner("none")}
              >
                RETOUR
              </button>
              <div className="headerGameTitle"></div>
            </div>
            {levels.length === 0 ? (
              <h1>
                niveaux en chargement, cela peut prendre quelques secondes
              </h1>
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
                              levelSetter(lvl.pattern);
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
                              levelSetter(lvl.pattern);
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
                              levelSetter(lvl.pattern);
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
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default LevelsSlide;
