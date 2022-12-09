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
    } else if (oStrict === "E") {
      if (type) {
        style["backgroundColor"] = "gray";
        style["animation"] = "pulseExit infinite 1.3s";
        style["zIndex"] = "2";
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

  //-- choice updater gère le choix et laffichage de l'élement choisi
  const choiceUpdater = () => {
    setOSelection(o);
    let pairs = [
      [
        "a",
        "activité du joueur",
        "1 seul possible, au contact direct du joueur",
      ],
      ["Bs", "boite", "peut se superposer sur certains objets"],
      ["C", "agent ennemi"],
      ["Dv", "porte verticale"],
      ["Dh", "porte horizontale"],
      ["E", "sortie", "1 seul autorisé"],
      ["Kv", "porte vérouillée 1 verticale"],
      ["Kh", "porte vérouillée 1 horizontale"],
      ["kg", "clés PV 1"],
      ["Lv", "porte vérouillée 2 verticale"],
      ["Lh", "porte vérouillée 2 horizontale"],
      ["lg", "clés PV 2"],
      ["Mv", "porte vérouillée 3 verticale"],
      ["Mh", "porte vérouillée 3 horizontale"],
      ["mg", "clés PV 3"],
      [
        "pg",
        "plaque de pression",
        "autorise la superposition de certains objets",
      ],
      ["P", "spawn du joueur", "1 seul possible"],
      ["W", "mur"],
      [".", "effacer"],
    ];
    let oIndex = pairs.findIndex((pair) => pair[0] === o);
    let message = pairs[oIndex][1];
    let message2 = pairs[oIndex][2];
    setOMessage([message, message2]);
  };

  //-- baseChecker vérifie si la modification de joueur est possible
  // const baseChecker = () => {};

  //-- baseUpdater met à jour la base à chaque modification du joueur
  const baseUpdater = () => {
    let newO = oSelection;
    for (let L = 0; L < base.length; L++) {}
    let newBase = [...base];
    newBase[xy[0]].splice([xy[1]], 1, newO);
    setBase(newBase);
  };

  //-- USEEFFECT
  useEffect(() => {}, [base]);

  ///-- RENDER --///
  return (
    <div>
      {location.pathname === "/game" && (
        <article style={styleMaker(o)} className="pos"></article>
      )}
      {type === "choose" && (
        <article onClick={choiceUpdater} style={styleMaker(o)} className="pos">
          {o === "a" && o}
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
