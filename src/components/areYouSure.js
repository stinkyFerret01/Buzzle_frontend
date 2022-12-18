///-- CONFIG --///
//-- import librairie
import { useNavigate } from "react-router-dom";

///-- START --///
const AreYouSure = ({
  setLevel,
  setBigScreen,
  displayAys,
  setDisplayAys,
  game,
}) => {
  //-- config et variables
  const navigate = useNavigate();

  const continuer = () => {
    if (displayAys[0].slice(0, 4) === "....") {
      const levelSetter = (pattern) => {
        setLevel(pattern);
        setBigScreen(true);
        setDisplayAys("none");
        navigate("/game/game");
      };
      levelSetter(displayAys);
    } else {
      if (displayAys !== "home") {
        setDisplayAys("none");
        navigate(`/${displayAys}`);
      } else {
        setDisplayAys("none");
        navigate(`/`);
      }
    }
  };

  ///-- RENDER --///
  return (
    <section className="spreadOver">
      <article className="ays">
        <h3>ATTENTION!</h3>
        <h4 className="noHovText">
          SI VOUS JOUEZ, VOUS RISQUEZ DE PERDRE VOTRE PROGRESSION!
        </h4>
        <div className="aysChoiceDisplayer">
          <button
            className="aysContinue"
            onClick={() => {
              continuer();
            }}
          >
            <h3>CONTINUER</h3>
          </button>
          <button className="aysAbort" onClick={() => setDisplayAys("none")}>
            <h3>ANNULER</h3>
          </button>
        </div>
      </article>
    </section>
  );
};

export default AreYouSure;
