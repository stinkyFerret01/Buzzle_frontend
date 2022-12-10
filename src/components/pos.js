///-- CONFIG --///
//-- import style et librairie
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

///-- START --///
// chaque composant Pos incarne une "position" sur la grille du jeu
// cette position est représentée par une <div> dont le style est défini ici
const Pos = ({
  o,
  type,
  oSelection,
  setOSelection,
  setOMessage,
  base,
  setBase,
  xy,
}) => {
  const location = useLocation();

  ///-- FONCTIONS --///
  //-- styleMaker détermine le style des Pos en fonctions de leurs valeurs
  const styleMaker = (o) => {
    let oStrict = o.slice(0, 1);
    let oObj = o.slice(0, 2);
    let act = o.slice(o.length - 1);
    let style = {};
    if (act === "a") {
      style["animation"] = "pulse infinite 1.3s";
      style["zIndex"] = "2";
    }
    if (oObj === "Bs" || oObj === "bs") {
      style["border"] = "solid black 2px";
      style["backgroundColor"] = "green";
    } else if (oStrict === "C") {
      style["borderRadius"] = "50%";
      style["backgroundColor"] = "blue";
    } else if (oObj === "Dh") {
      style["borderTop"] = "solid black 6px";
      style["borderBottom"] = "solid black 6px";
      style["backgroundColor"] = "aqua";
    } else if (oObj === "Dv") {
      style["borderLeft"] = "solid black 6px";
      style["borderRight"] = "solid black 6px";
      style["backgroundColor"] = "aqua";
    } else if (oStrict === "e") {
      style["backgroundColor"] = "black";
      style["animation"] = "pulseExit infinite 1.3s";
      style["zIndex"] = "1";
    } else if (oStrict === "E") {
      if (type) {
        style["backgroundColor"] = "gray";
        style["animation"] = "pulseExit infinite 1.3s";
        style["border"] = "solid black 1px";
        style["zIndex"] = "1";
      } else {
        style["backgroundColor"] = "gray";
      }
    } else if (oObj === "kg") {
      style["border"] = "solid orangered 2px";
      style["margin"] = "4px";
      style["width"] = "8px";
      style["height"] = "8px";
    } else if (oObj === "Kh") {
      style["borderTop"] = "solid black 6px";
      style["borderBottom"] = "solid black 6px";
      style["backgroundColor"] = "orangered";
    } else if (oObj === "Kv") {
      style["borderLeft"] = "solid black 6px";
      style["borderRight"] = "solid black 6px";
      style["backgroundColor"] = "orangered";
    } else if (oObj === "lg") {
      style["border"] = "solid orange 2px";
      style["margin"] = "4px";
      style["width"] = "8px";
      style["height"] = "8px";
    } else if (oObj === "Lh") {
      style["borderTop"] = "solid black 6px";
      style["borderBottom"] = "solid black 6px";
      style["backgroundColor"] = "orange";
    } else if (oObj === "Lv") {
      style["borderLeft"] = "solid black 6px";
      style["borderRight"] = "solid black 6px";
      style["backgroundColor"] = "orange";
    } else if (oObj === "mg") {
      style["border"] = "solid yellow 2px";
      style["margin"] = "4px";
      style["width"] = "8px";
      style["height"] = "8px";
    } else if (oObj === "Mh") {
      style["borderTop"] = "solid black 6px";
      style["borderBottom"] = "solid black 6px";
      style["backgroundColor"] = "yellow";
    } else if (oObj === "Mv") {
      style["borderLeft"] = "solid black 6px";
      style["borderRight"] = "solid black 6px";
      style["backgroundColor"] = "yellow";
    } else if (oObj === "pg") {
      style["borderRadius"] = "50%";
      style["border"] = "solid gray 2px";
      style["backgroundColor"] = "red";
      style["margin"] = "2px";
      style["width"] = "12px";
      style["height"] = "12px";
    } else if (o === "P") {
      style["borderRadius"] = "50%";
      style["backgroundColor"] = "rgba(234, 178, 11, 1)";
    } else if (oStrict === "W") {
      style["backgroundColor"] = "gray";
    } else if (oStrict === "0") {
      style["border"] = "solid green 4px";
      style["margin"] = "2px";
      style["width"] = "12px";
      style["height"] = "12px";
      style["backgroundColor"] = "red";
    } else if (oStrict === "4") {
      style["border"] = "solid green 4px";
      style["margin"] = "2px";
      style["width"] = "12px";
      style["height"] = "12px";
      style["backgroundColor"] = "orangered";
    } else if (oStrict === "5") {
      style["border"] = "solid green 4px";
      style["margin"] = "2px";
      style["width"] = "12px";
      style["height"] = "12px";
      style["backgroundColor"] = "orange";
    } else if (oStrict === "6") {
      style["border"] = "solid green 4px";
      style["margin"] = "2px";
      style["width"] = "12px";
      style["height"] = "12px";
      style["backgroundColor"] = "yellow";
    } else if (oStrict === ".") {
      if (type === "choose") {
        style["border"] = "solid black 3px";
        style["backgroundColor"] = "white";
      } else {
        style["backgroundColor"] = "black";
      }
    }

    // if (type === "edit") {
    //   style["margin"] = "0.5px";
    // }
    // if (type === "edit") {
    //   style["margin"] = "0.5px";
    // }
    return style;
  };

  //-- baseUpdater met à jour la base à chaque modification du joueur
  const baseUpdater = () => {
    let newO = oSelection;
    console.log(newO);
    let newBase = [...base];
    for (let L = 0; L < base.length; L++) {}
    if (xy[0] > 0 && xy[0] < base.length - 1) {
      if (
        xy[0] > 1 &&
        xy[0] < base.length - 2 &&
        xy[1] > 0 &&
        xy[1] < base[0].length - 1
      ) {
        if (newO === base[xy[0]][xy[1]]) {
          newBase[xy[0]].splice([xy[1]], 1, ".");
        } else if (newO === "Bs") {
          if (newBase[xy[0]][xy[1]] === "kg") {
            newBase[xy[0]].splice([xy[1]], 1, "4");
          } else if (newBase[xy[0]][xy[1]] === "lg") {
            newBase[xy[0]].splice([xy[1]], 1, "5");
          } else if (newBase[xy[0]][xy[1]] === "mg") {
            newBase[xy[0]].splice([xy[1]], 1, "6");
          } else if (newBase[xy[0]][xy[1]] === "pg") {
            newBase[xy[0]].splice([xy[1]], 1, "0");
          } else {
            newBase[xy[0]].splice([xy[1]], 1, newO);
          }
        } else {
          newBase[xy[0]].splice([xy[1]], 1, newO);
        }
      } else if (newO === "E" || newO === "W") {
        if (newO === base[xy[0]][xy[1]]) {
          newBase[xy[0]].splice([xy[1]], 1, "W");
        } else {
          newBase[xy[0]].splice([xy[1]], 1, newO);
        }
      }
    }

    setBase(newBase);
  };

  //-- USEEFFECT
  useEffect(() => {}, [base]);

  ///-- RENDER --///
  return (
    <div>
      {(location.pathname === "/game/game" ||
        location.pathname === "/game/editor") && (
        <article style={styleMaker(o)} className="pos"></article>
      )}
      {type === "choose" && (
        <article style={styleMaker(o)} className="pos">
          {o === "E" && "s"}
        </article>
      )}
      {type === "edit" && (
        <article
          onClick={baseUpdater}
          style={styleMaker(o)}
          className="pos"
        ></article>
      )}
    </div>
  );
};

export default Pos;
