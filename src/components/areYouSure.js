///-- CONFIG --///
//-- import librairie
import { useNavigate } from "react-router-dom";

///-- START --///
const AreYouSure = ({ setLevel, setBigScreen, displayAys, setDisplayAys }) => {
  //-- config et variables
  const navigate = useNavigate();

  const continuer = () => {
    console.log(displayAys);
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
        <h5 className="noHovText" style={{ fontSize: "11px" }}>
          vous êtes sur le point de changer de page, si vous continuez votre
          progression peut etre perdue
        </h5>
        <div className="aysChoiceDisplayer">
          <button
            className="aysContinue"
            onClick={() => {
              continuer();
            }}
          >
            <div>continuer</div>
          </button>
          <button className="aysAbort" onClick={() => setDisplayAys("none")}>
            <div>anuler</div>
          </button>
        </div>
      </article>
    </section>
  );
};

export default AreYouSure;
