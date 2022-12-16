///-- CONFIG --///
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

///-- START --///
const LevelsSlide = ({
  setBigScreen,
  levels,
  setLevel,
  setLevelTitle,
  setLevelContext,
  setDisplayContext,
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

  const levelSetter = (lvl) => {
    if (lvl === "TUTO") {
      const tuto1 = {
        pattern: [
          ".........",
          "WWWWWWWWW",
          "WB..W...W",
          "W.P.W.P.W",
          "WWHWW...E",
          "W.....p.W",
          "W.......W",
          "WWWWWWWWW",
          ".........",
        ],
        name: "TUTO 1",
        context: "posez la boîte sur la plaque de pression pour sortir",
      };
      setLevel(tuto1.pattern);
      setLevelTitle(tuto1.name);
      setLevelContext(tuto1.context);
      setDisplayContext(true);
    } else {
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
      setDisplayLevels(true);
    }
  };

  ///-- USEEFFECT --///
  useEffect(() => {}, [levels]);

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
          className={
            game[0] !== "Playing..." ? "burgerMenuSlide" : "burgerMenuSlide2"
          }
          style={displayLevels ? { paddingLeft: "0.3rem" } : {}}
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
                TUTO
              </button>
            </div>
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
                <p>{"<"}</p>
              </button>
              <div className="headerGameTitle"></div>
            </div>
            {levels.length === 0 ? (
              <div className="headerGameDivs">
                <h1 style={{ color: "red" }}>
                  niveaux en chargement, cela peut prendre quelques secondes
                </h1>
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
                              levelSetter(lvl);
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
