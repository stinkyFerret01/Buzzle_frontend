const Pos = ({ o }) => {
  //-- styleMaker détermine le style des Pos en fonctions de leurs valeurs
  const styleMaker = (o) => {
    let oStrict = o.slice(0, 1);
    let act = o.slice(o.length - 1);
    let style = {};
    if (o === "P") {
      style["borderRadius"] = "50%";
      style["backgroundColor"] = "rgba(234, 178, 11, 1)";
    }
    if (oStrict === "W") {
      style["backgroundColor"] = "gray";
    }
    if (act === "a") {
      style["animation"] = "pulse infinite 1.3s";
      style["zIndex"] = "1";
    }
    return style;
  };

  //-- RENDER
  return <article style={styleMaker(o)} className="pos"></article>;
};

export default Pos;
