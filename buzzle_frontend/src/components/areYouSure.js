///-- CONFIG --///
//-- import librairie
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

///-- START --///
const AreYouSure = ({ displayAys, setDisplayAys }) => {
  const [displayNext, setDisplayNext] = useState(displayAys);
  //-- config et variables
  const navigate = useNavigate();

  //-- USEEFFECT
  useEffect(() => {
    if (displayAys === "") {
      setDisplayNext("home");
    } else {
      setDisplayNext(displayAys);
    }
  }, [displayAys]);
  ///-- RENDER --///
  return (
    <article className="ays">
      <h6>
        etes vous sur de vouloir changer de page? votre progression sera perdue
      </h6>
      <button
        onClick={() => {
          setDisplayAys("none");
          navigate(`/${displayAys}`);
        }}
      >
        go to <span style={{ color: "red" }}>{displayNext}</span>
      </button>
      <button onClick={() => setDisplayAys("none")}>anuler</button>
    </article>
  );
};

export default AreYouSure;
