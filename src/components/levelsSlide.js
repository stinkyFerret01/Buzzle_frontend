///-- CONFIG --///
import { useState } from "react";
import { useLocation } from "react-router-dom";

///-- START --///
const LevelsSlide = ({
  setBigScreen,
  levels,
  setLevel,
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

  ///-- RENDER --///
  return (
    <section
      className={displayLevels ? "levelsSlide" : "levelsSlide2"}
      onMouseLeave={() => setDisplayLevels(false)}
    >
      {gameDiv === "none" ? (
        <div className="headerGameTitles">
          <div>
            <button
              className="headerGameTitleValid"
              onClick={() => gamDivDefiner("validé")}
            >
              NIVEAUX VALIDES!
            </button>
          </div>
          <div>
            <button
              className="headerGameTitleNew"
              onClick={() => gamDivDefiner("à tester")}
            >
              NIVEAUX NON VERIFIE...
            </button>
          </div>
          <div>
            <button
              className="headerGameTitleSearch"
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
          <div className="headerGameTitle"></div>
        </div>
      ) : (
        <div>
          <div className="headerGameTitles2">
            <button
              className="headerGameTitle"
              style={gameDiv === "validé" ? { backgroundColor: "black" } : {}}
              onClick={() => gamDivDefiner("validé")}
            >
              validé
            </button>
            <button
              className="headerGameTitle"
              style={gameDiv === "à tester" ? { backgroundColor: "black" } : {}}
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
        </div>
      )}
    </section>
  );
};

export default LevelsSlide;
