///-- CONFIG --///
//-- import librairie
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

///-- START --///
const Header = ({ theme, setTheme, levels, setLevel, setDisplayAys }) => {
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
          className="headerSectionGhost"
          onClick={() => {
            setDisplayAys("home");
          }}
          style={{ left: "0%" }}
        >
          <h1 style={{ pointerEvents: "none" }}>HOME</h1>
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
          className="headerSectionGhost"
          onClick={
            location.pathname === "/"
              ? () => navigate("/game/game")
              : () => setDisplayAys("game/game")
          }
          style={{ left: "33.33%" }}
        >
          <h1>PLAY BUZZLE!</h1>
        </section>
      )}
      {/* RIGHT */}
      <section
        className="headerSectionGhost"
        onClick={
          location.pathname === "/"
            ? () => navigate("/editor")
            : () => setDisplayAys("editor")
        }
        style={{ left: "66.66%" }}
      >
        <h1>EDIT</h1>
      </section>
    </header>
  );
};

export default Header;
