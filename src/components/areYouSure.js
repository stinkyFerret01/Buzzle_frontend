///-- CONFIG --///
//-- import librairie
import { useNavigate } from "react-router-dom";

///-- START --///
const AreYouSure = ({ displayAys, setDisplayAys }) => {
  //-- config et variables
  const navigate = useNavigate();

  ///-- RENDER --///
  return (
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
            setDisplayAys("none");
            navigate(`/${displayAys}`);
          }}
        >
          <span style={{ color: "red" }}>continuer</span>
        </button>
        <button className="aysAbort" onClick={() => setDisplayAys("none")}>
          anuler
        </button>
      </div>
    </article>
  );
};

export default AreYouSure;
