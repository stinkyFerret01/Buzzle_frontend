///-- CONFIG --///
import { useState } from "react";
import { useNavigate } from "react-router-dom";

///-- START --///
const LevelsSlide = ({
  setBigScreen,
  levels,
  setLevel,
  displayLevels,
  setDisplayLevels,
}) => {
  ///-- STATES --///
  const [searchLvl, setSearchLvl] = useState("");
  const [gameDiv, setGameDiv] = useState("validé");

  const searchedLevels = levels.filter(
    (lvl) => lvl.name.toUpperCase().indexOf(searchLvl.toUpperCase()) >= 0
  );
  const navigate = useNavigate();

  ///-- FONCTIONS --///
  ///-- gameDivDefiner
  const gamDivDefiner = (div) => {
    if (div !== gameDiv) {
      setGameDiv(div);
    }
  };

  const levelSetter = (pattern) => {
    setLevel(pattern);
    setBigScreen(true);
    navigate("/game/game");
  };

  ///-- RENDER --///
  return (
    <section
      className={displayLevels ? "levelsSlide" : "levelsSlide2"}
      onMouseLeave={() => setDisplayLevels(false)}
    >
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
            style={gameDiv === "à tester" ? { backgroundColor: "black" } : {}}
            onClick={() => gamDivDefiner("à tester")}
          >
            à tester
          </button>
          <button
            className="headerGameTitle"
            style={gameDiv === "rechercher" ? { backgroundColor: "black" } : {}}
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
    </section>
  );
};

export default LevelsSlide;
