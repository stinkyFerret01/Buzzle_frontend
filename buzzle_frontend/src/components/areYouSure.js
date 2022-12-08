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
      <button onClick={() => setDisplayAys("none")}>close</button>
      <button
        onClick={() => {
          setDisplayAys("none");
          navigate(`/${displayAys}`);
        }}
      >
        {displayAys}
      </button>
    </article>
  );
};

export default AreYouSure;
