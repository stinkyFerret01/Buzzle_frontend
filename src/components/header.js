///-- CONFIG --///
//-- import librairie
import axios from "axios";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

///-- START --///
const Header = ({
  backend,
  theme,
  setTheme,
  setLevel,
  edited,
  setDisplayAys,
  setDisplayWfr,
}) => {
  ///-- STATES --///
  const [levels, setLevels] = useState([]);
  const [searchLvl, setSearchLvl] = useState("");
  const [gameDiv, setGameDiv] = useState("validé");
  const searchedLevels = levels.filter(
    (lvl) => lvl.name.toUpperCase().indexOf(searchLvl.toUpperCase()) >= 0
  );

  const navigate = useNavigate();
  const location = useLocation();

  ///-- FONCTIONS --///
  const editer = async () => {
    if (edited[0] !== "none" && edited[1] !== "") {
      try {
        setDisplayWfr(true);
        const response = await axios.post(`${backend}/edit`, {
          pattern: edited[0],
          name: edited[1],
          status: edited[2],
        });
        if (response.data.message === "votre niveau a été édité!") {
          setDisplayWfr(false);
        }
        console.log(response.data.message);
      } catch (error) {}
    }
  };

  ///-- gameDivDefiner
  const gamDivDefiner = (div) => {
    if (div !== gameDiv) {
      setGameDiv(div);
    }
  };

  //-- USEEFFECT
  useEffect(() => {}, [levels, searchLvl]);

  //-- fetcher (requete au backend pour récupérer les niveaux)
  useEffect(() => {
    const fetcher = async () => {
      try {
        const response = await axios.get(`${backend}/levels`);
        setLevels(response.data.levels);
      } catch (error) {}
    };
    fetcher();
  }, [backend]);

  ///-- RENDER --///
  return (
    <header>
      {/* LEFT */}
      <section
        className="headerSection"
        style={
          location.pathname === "/"
            ? {
                boxShadow: "0 0 3rem rgba(234, 178, 11, 0.7)",
              }
            : {}
        }
      >
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
      <section
        className="headerSection"
        style={
          location.pathname.slice(0, 5) === "/game"
            ? {
                boxShadow: "0 0 5rem rgba(234, 178, 11, 0.7)",
              }
            : {}
        }
      >
        {levels.length >= 0 ? (
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
          <div>Loading</div>
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
      <section
        className="headerSection"
        style={
          location.pathname === "/editor"
            ? {
                boxShadow: "0 0 3rem rgba(234, 178, 11, 0.7)",
              }
            : {}
        }
      >
        {edited[0] !== "none" && edited[1].length > 2 && (
          <button className="headerEditButton" onClick={editer}>
            EDIT
          </button>
        )}
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
