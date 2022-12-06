///-- START --///
// chaque composant Pos incarne une "position" sur la grille du jeu
// cette position est représentée par une <div> dont le style est défini ici
const Pos = ({ o }) => {
  //-- styleMaker détermine le style des Pos en fonctions de leurs valeurs
  const styleMaker = (o) => {
    let oStrict = o.slice(0, 1);
    let oObj = o.slice(0, 2);
    let act = o.slice(o.length - 1);
    let style = {};
    if (o === "P") {
      style["borderRadius"] = "50%";
      style["backgroundColor"] = "rgba(234, 178, 11, 1)";
    }
    if (oStrict === "W") {
      style["backgroundColor"] = "gray";
    } else if (oObj === "Dv") {
      style["borderLeft"] = "solid black 6px";
      style["borderRight"] = "solid black 6px";
      style["backgroundColor"] = "brown";
    } else if (oObj === "Dh") {
      style["borderTop"] = "solid black 6px";
      style["borderBottom"] = "solid black 6px";
      style["backgroundColor"] = "brown";
    } else if (oObj === "Lv") {
      style["borderLeft"] = "solid black 6px";
      style["borderRight"] = "solid black 6px";
      style["backgroundColor"] = "gold";
    } else if (oObj === "Lh") {
      style["borderTop"] = "solid black 6px";
      style["borderBottom"] = "solid black 6px";
      style["backgroundColor"] = "gold";
    } else if (oObj === "Bs" || oObj === "bs") {
      style["border"] = "solid black 2px";
      style["backgroundColor"] = "green";
    }
    if (act === "a") {
      style["animation"] = "pulse infinite 1.3s";
      style["zIndex"] = "1";
    }
    return style;
  };

  ///-- RENDER --///
  return <article style={styleMaker(o)} className="pos"></article>;
};

export default Pos;
