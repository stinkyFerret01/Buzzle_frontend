///-- CONFIG --///
//-- import librairie
import axios from "axios";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

///-- START --///
const Header = ({ backend, setLevel, setDisplayAys }) => {
  ///-- STATES --///
  const [levels, setLevels] = useState("loading");

  const navigate = useNavigate();
  const location = useLocation();

  //-- USEEFFECT
  useEffect(() => {
    const fetcher = async () => {
      try {
        const response = await axios.get(`${backend}/levels`);
        setLevels(response.data.levels);
        console.log(backend);
        if (response.data.levels !== undefined) {
          setLevels(response.data.levels);
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
        <button onClick={() => {}}>connect</button>
      </section>
      {location.pathname !== "/" && (
        <section
          onClick={() => {
            setDisplayAys("");
          }}
          style={{ left: "0%" }}
          className="headerSectionGhost"
        >
          HOME
        </section>
      )}
      {/* CENTER */}
      <section className="headerSection">
        {levels !== "loading" ? (
          <div>
            {levels.map((lvl, index) => {
              return (
                <button
                  onClick={() => {
                    location.pathname === "/game" && setLevel(lvl.pattern);
                  }}
                  key={index}
                >
                  {lvl.name}
                </button>
              );
            })}
          </div>
        ) : (
          <div>Loading</div>
        )}
      </section>
      {location.pathname !== "/game" && (
        <section
          onClick={
            location.pathname === "/"
              ? () => navigate("/game")
              : () => setDisplayAys("game")
          }
          style={{ left: "33.33%" }}
          className="headerSectionGhost"
        >
          GAME
        </section>
      )}
      {/* RIGHT */}
      <section className="headerSection"></section>
      {location.pathname !== "/editor" && (
        <section
          onClick={
            location.pathname === "/"
              ? () => navigate("/editor")
              : () => setDisplayAys("editor")
          }
          style={{ left: "66.66%" }}
          className="headerSectionGhost"
        >
          EDITOR
        </section>
      )}
    </header>
  );
};

export default Header;
