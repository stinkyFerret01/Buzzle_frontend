///-- CONFIG --///
//-- import librairie
import axios from "axios";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

///-- START --///
const Header = ({ backend, setLevel, edited, setDisplayAys }) => {
  ///-- STATES --///
  const [levels, setLevels] = useState("loading");
  const [levelsNew, setLevelsNew] = useState("loading");

  const navigate = useNavigate();
  const location = useLocation();

  ///-- FONCTIONS --///
  const editer = async () => {
    if (edited[0] !== "none" && edited[1] !== "") {
      try {
        const response = await axios.post(`${backend}/edit`, {
          pattern: edited[0],
          name: edited[1],
          status: edited[2],
        });
        console.log(response.data.message);
      } catch (error) {}
    }
  };

  //-- USEEFFECT
  useEffect(() => {}, [levels, levelsNew]);

  useEffect(() => {
    const fetcher = async () => {
      try {
        const response = await axios.get(`${backend}/levels`);
        setLevels(response.data.levels);
        console.log(backend);
        if (response.data.levelsValid !== undefined) {
          setLevels(response.data.levelsValid);
          setLevelsNew(response.data.levelsNew);
        } else {
          console.log(response.data.alert);
        }
      } catch (error) {}
    };
    fetcher();
  }, [backend]);

  ///-- RENDER --///
  return (
    <header>
      {/* LEFT */}
      <section className="headerSection">
        <button onClick={() => {}}>se connecter (inactif)</button>
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
        {levels !== "loading" && levelsNew !== "loading" ? (
          <div className="headerGameDivs">
            <div className="headerGameDiv">
              {levels.map((lvl, index) => {
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
              })}
            </div>
            <div className="headerGameDiv">
              {levelsNew.map((lvl, index) => {
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
              })}
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
      <section className="headerSection">
        <button onClick={editer}>EDIT</button>
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
