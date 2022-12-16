///-- CONFIG --///
//-- import librairie
import { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";

//-- import des composants
import Pos from "./pos";
import LevelsSlide from "./levelsSlide";

const GamePage = ({
  level,
  setLevel,
  levelTitle,
  setLevelTitle,
  levelContext,
  setLevelContext,
  levels,
  setLevels,
  setDisplayAys,
  game,
  setGame,
  edited,
  bigScreen,
  setBigScreen,
  displayLevels,
  setDisplayLevels,
}) => {
  ///-- STATES --///
  const [displayPad, setDisplayPad] = useState(false);
  const [displayInfo, setDisplayInfo] = useState(false);
  const [base, setBase] = useState("loading");
  const [player, setPlayer] = useState("loading");
  const [objects, setObjects] = useState("loading");
  const [cops, setCops] = useState([]);
  const [grid, setGrid] = useState(base);
  const [action, setAction] = useState("");
  const [difficulty, setDifficulty] = useState("medium");
  const [displayContext, setDisplayContext] = useState(true);
  const [counter, setCounter] = useState(0);

  ///////////////////////////////////////////
  const titleRef = useRef();
  const handleBackClick = () => {
    titleRef.current.scrollIntoView({ behavior: "smooth" });
  };
  ////////////////////////////////////////////

  //-- config et variables dures
  const navigate = useNavigate();
  const location = useLocation();

  ///-- FONCTIONS --///
  //-- screenToggler
  const screenToggler = () => {
    if (bigScreen === true) {
      setBigScreen(false);
    } else {
      setBigScreen(true);
    }
  };

  //-- padToggler
  const padToggler = () => {
    if (displayPad === true) {
      setDisplayPad(false);
    } else {
      setDisplayPad(true);
    }
  };

  const infoToggler = () => {
    if (displayInfo === true) {
      setDisplayInfo(false);
    } else {
      setDisplayInfo(true);
    }
  };

  //-- contextToggler
  const contextToggler = () => {
    if (displayContext === true) {
      setDisplayContext(false);
    } else {
      setDisplayContext(true);
    }
  };

  //-- difficultySetter
  const difficultySetter = (dif) => {
    console.log();
    if (game[0] !== "Playing...") {
      setDifficulty(dif);
    }
  };

  //-- okToMoveChecker vérifie si le déplacement du joueur est possible
  const okToMoveChecker = (o, id) => {
    // console.log(o);
    if (o === undefined) {
      // console.log(cops);
      // setCops([]);
      return false;
    }
    let oStrict = o.slice(0, 1);
    let blocker = ["W", "B", "D", "K", "L", "M", "E"];
    if (id === "cop") {
      blocker.push("b");
    } else if (id === "act") {
      blocker.push("C");
    }
    let blockerTest = blocker.findIndex((block) => block === oStrict);
    if (blockerTest >= 0) {
      return false;
    } else {
      return true;
    }
  };

  //-- actioner défini la nouvelle valeur d'un object après une action du joueur
  const actioner = (obj) => {
    let pairs = [
      ["Dv", "dv"],
      ["Dh", "dh"],
      ["Bs", "bs"],
      ["kg", "ki"],
      ["lg", "li"],
      ["mg", "mi"],
    ];
    let mod = pairs.find((pair) => pair[0] === obj || pair[1] === obj);
    if (mod && obj === mod[0]) {
      return [player[2], player[3], mod[1]];
    } else if (mod && obj === mod[1] && obj.slice(1, 2) !== "i") {
      return [player[2], player[3], mod[0]];
    }
    let oStrict = obj.slice(0, 1);
    let oAxe = obj.slice(1, 2);
    let locked = ["K", "L", "M", "p"];
    let goodKey = locked.find((lock) => lock === oStrict).toLowerCase();
    if (goodKey !== undefined) {
      if (objects.find((obj) => obj[2] === `${goodKey}i`) !== undefined) {
        return [player[2], player[3], `d${oAxe}`];
      } else {
        return [player[2], player[3], `${oStrict}${oAxe}`];
      }
    }
  };

  //-- starter
  const starter = (o) => {
    if (o === undefined) {
      o = "none";
    }
    if (game === "Ready?") {
    } else if (game[0] === "Win!" || game[0] === "Lost!" || o === "refresh") {
      let refresh = [...level];
      // setGame(["Ready?", "test", "RESTART"]);
      setLevel(refresh);
      setCops([]);
    } else if (game[0] === "Playing...") {
      setGame(["Pause...", "CONTINUER", "RESTART"]);
    } else {
      setGame(["Playing...", "STOP"]);
    }
  };

  //-- gameQuiter
  const gameQuiter = (page) => {
    if (game[0] !== "Playing..." && game[0] !== "Pause...") {
      navigate(`/${page}`);
    } else {
      setDisplayAys(page);
    }
  };

  //-- handleKeyDown interprète les commandes du clavier
  const handleKeyDown = (event, k) => {
    let key = event.key;
    if (game[0] === "Playing...") {
      handleBackClick();
      if (event === "pad") {
        key = k;
      }
      let actChecker = objects.find((obj) => obj[2] === "bs");
      if (player !== "loading") {
        if (key === "ArrowLeft") {
          let newPos = [player[0], player[1] - 1, player[0], player[1] - 2];
          let o = grid[newPos[0]][newPos[1]];
          let oAct = grid[newPos[2]][newPos[3]];
          if (
            (actChecker === undefined && okToMoveChecker(o)) ||
            (actChecker !== undefined &&
              okToMoveChecker(o) &&
              okToMoveChecker(oAct, "act"))
          ) {
            setPlayer(newPos);
          } else if (
            actChecker === undefined ||
            (okToMoveChecker(o) && !okToMoveChecker(oAct, "act"))
          ) {
            newPos = [player[0], player[1], player[0], player[1] - 1];
            setPlayer(newPos);
          }
        }
        if (key === "ArrowRight") {
          let newPos = [player[0], player[1] + 1, player[0], player[1] + 2];
          let o = grid[newPos[0]][newPos[1]];
          let oAct = grid[newPos[2]][newPos[3]];
          if (
            (actChecker === undefined && okToMoveChecker(o)) ||
            (actChecker !== undefined &&
              okToMoveChecker(o) &&
              okToMoveChecker(oAct, "act"))
          ) {
            setPlayer(newPos);
          } else if (
            actChecker === undefined ||
            (okToMoveChecker(o) && !okToMoveChecker(oAct, "act"))
          ) {
            newPos = [player[0], player[1], player[0], player[1] + 1];
            setPlayer(newPos);
          }
        }
        if (key === "ArrowUp") {
          let newPos = [player[0] - 1, player[1], player[0] - 2, player[1]];
          let o = grid[newPos[0]][newPos[1]];
          let oAct = grid[newPos[2]][newPos[3]];
          if (
            (actChecker === undefined && okToMoveChecker(o)) ||
            (actChecker !== undefined &&
              okToMoveChecker(o) &&
              okToMoveChecker(oAct, "act"))
          ) {
            setPlayer(newPos);
          } else if (
            actChecker === undefined ||
            (okToMoveChecker(o) && !okToMoveChecker(oAct, "act"))
          ) {
            newPos = [player[0], player[1], player[0] - 1, player[1]];
            setPlayer(newPos);
          }
        }
        if (key === "ArrowDown") {
          let newPos = [player[0] + 1, player[1], player[0] + 2, player[1]];
          let o = grid[newPos[0]][newPos[1]];
          let oAct = grid[newPos[2]][newPos[3]];
          if (
            (actChecker === undefined && okToMoveChecker(o)) ||
            (actChecker !== undefined &&
              okToMoveChecker(o) &&
              okToMoveChecker(oAct, "act"))
          ) {
            setPlayer(newPos);
          } else if (
            actChecker === undefined ||
            (okToMoveChecker(o) && !okToMoveChecker(oAct, "act"))
          ) {
            newPos = [player[0], player[1], player[0] + 1, player[1]];
            setPlayer(newPos);
          }
        }
        if (key === "a") {
          let objIndex = objects.findIndex((obj) => obj[2] === "bs");
          let object = objects.find((obj) => obj[2] === "bs");
          if (object === undefined) {
            objIndex = objects.findIndex(
              (obj) =>
                obj[0] === player[2] &&
                obj[1] === player[3] &&
                obj[2].slice(1, 2) !== "i"
            );
            object = objects.find(
              (obj) =>
                obj[0] === player[2] &&
                obj[1] === player[3] &&
                obj[2].slice(1, 2) !== "i"
            );
          }
          if (objIndex >= 0) {
            let newObjects = [...objects];
            newObjects.splice(objIndex, 1, actioner(object[2]));
            setObjects(newObjects);
          }
        }
      }
    }
    if (key === "Enter") {
      starter();
    }
    if (key === "r") {
      starter("refresh");
    }
  };

  ///--USEEFFECT --///
  //-- keyboardListener (reçois et transmet les commandes claviers)
  //-- (PROBEMO dépendance handleKeyDown)
  useEffect(() => {
    window.removeEventListener("keydown", handleKeyDown);
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
    //////------ PROBLEMO ------//////
    // eslint-disable-next-line
  }, [game, player, grid]);

  //-- actionDefiner (défini l'action possible)
  useEffect(() => {
    if (
      player !== "loading" &&
      player.length > 2 &&
      grid[player[2]][player[3]]
    ) {
      const actionDefiner = (L, o) => {
        //-- actionDefiner défini l'action possible du joueur pour l'orienter
        let obj = grid[L][o];
        const pairs = [
          ["bs", "poser la boite"],
          ["Bs", "prendre la boite"],
          ["dh", "dv", "fermer la porte"],
          ["Dh", "Dv", "ouvrir la porte"],
          [".", ".a", ""],
          ["kg", "lg", "mg", "ramasser la clef"],
          ["ki", "li", "mi", ""],
          ["Kv", "Lv", "Mv", "porte vérrouillée"],
          ["Kh", "Lh", "Mh", "porte vérrouillée"],
          ["pg", "plaque de pression"],
          ["W", "Wa", ""],
          ["Ca", "attention!"],
        ];
        let activity = pairs.find(
          (pair) =>
            //  pair.findIndex((find) => find === obj.slice(0, 2))
            pair[0] === obj.slice(0, 2) ||
            pair[1] === obj.slice(0, 2) ||
            pair[2] === obj.slice(0, 2)
        );
        if (activity) {
          setAction(activity[activity.length - 1]);
        }
      };
      actionDefiner(player[2], player[3]);
    }
  }, [player, grid]);

  //-- gameBuilder (prépare le niveau en début de partie)
  useEffect(() => {
    //-- baseBuilder construit le tableau du niveau choisi
    const baseBuilder = (lvl) => {
      let eBase = [];
      let basePlayer = [];
      let baseObjects = [];
      let baseCops = [];
      for (let L = 0; L < lvl.length; L++) {
        let lign = [];
        for (let o = 0; o < lvl[0].length; o++) {
          let pos = lvl[L][o];
          if (pos === "W") {
            lign.push("W");
          } else {
            lign.push(".");
          }
          if (pos === "a") {
            basePlayer.push(L, o);
          } else if (pos === "B") {
            baseObjects.unshift([L, o, "Bs"]);
          } else if (pos === "C") {
            baseCops.push([L, o, "C"]);
          } else if (pos === "E") {
            baseObjects.push([L, o, "E"]);
          } else if (pos === "v") {
            baseObjects.push([L, o, "dv"]);
          } else if (pos === "V") {
            baseObjects.push([L, o, "Dv"]);
          } else if (pos === "h") {
            baseObjects.push([L, o, "dh"]);
          } else if (pos === "H") {
            baseObjects.push([L, o, "Dh"]);
          } else if (pos === "k") {
            baseObjects.push([L, o, "Kv"]);
          } else if (pos === "K") {
            baseObjects.push([L, o, "Kh"]);
          } else if (pos === "l") {
            baseObjects.push([L, o, "Lv"]);
          } else if (pos === "L") {
            baseObjects.push([L, o, "Lh"]);
          } else if (pos === "m") {
            baseObjects.push([L, o, "Mv"]);
          } else if (pos === "M") {
            baseObjects.push([L, o, "Mh"]);
          } else if (pos === "p") {
            baseObjects.push([L, o, "pg"]);
          } else if (pos === "P") {
            basePlayer.unshift(L, o);
          } else if (pos === "1") {
            baseObjects.push([L, o, "kg"]);
          } else if (pos === "2") {
            baseObjects.push([L, o, "lg"]);
          } else if (pos === "3") {
            baseObjects.push([L, o, "mg"]);
          } else if (pos === "4") {
            baseObjects.unshift([L, o, "Bs"]);
            baseObjects.push([L, o, "kg"]);
          } else if (pos === "5") {
            baseObjects.unshift([L, o, "Bs"]);
            baseObjects.push([L, o, "lg"]);
          } else if (pos === "6") {
            baseObjects.unshift([L, o, "Bs"]);
            baseObjects.push([L, o, "mg"]);
          } else if (pos === "0") {
            baseObjects.unshift([L, o, "Bs"]);
            baseObjects.push([L, o, "pg"]);
          }
        }
        eBase.push(lign);
      }
      setPlayer(basePlayer);
      setObjects(baseObjects);
      setCops(baseCops);
      return eBase;
    };
    if (level !== "none") {
      setBase(baseBuilder(level));
      setGame(["Ready?", "START"]);
    }
  }, [level, setGame]);

  //-- presLevel (défini le niveau par défault (en dur))
  useEffect(() => {
    if (
      location.pathname === "/game/game" &&
      (level === edited[0] || level === "none")
    ) {
      const tuto1 = {
        pattern: [
          ".........",
          "WWWWWWWWW",
          "WB..W...W",
          "W.P.W.P.W",
          "WWHWW...E",
          "W.....p.W",
          "W.......W",
          "WWWWWWWWW",
          ".........",
        ],
        name: "TUTO 1",
        context: "posez la boîte sur la plaque de pression pour sortir",
      };
      setCops([]);
      setLevel(tuto1.pattern);
      setLevelTitle(tuto1.name);
      setLevelContext(tuto1.context);
      setGame(["Ready?", "START"]);
    }
  }, [
    level,
    setLevel,
    setLevelContext,
    setLevelTitle,
    setGame,
    edited,
    location,
  ]);

  //-- counterAdder
  //-- (PROBEMO dépendance player)
  useEffect(() => {
    const counterAdder = () => {
      setCounter(counter + 1);
      console.log(counter);
    };
    if (game[0] === "Playing...") {
      if (difficulty === "hard") {
        setTimeout(counterAdder, 500);
      } else if (difficulty === "medium") {
        setTimeout(counterAdder, 800);
      } else if (difficulty === "easy") {
        setTimeout(counterAdder, 1100);
      }
    }
  }, [counter, game, difficulty]);

  //-- copsMover (gère le déplacement des agents)
  //-- (PROBEMO dépendance player)
  useEffect(() => {
    const copsMover = () => {
      let newCops = [];
      for (let c = 0; c < cops.length; c++) {
        let oldCop = [cops[c][0], cops[c][1], "C"];
        let newCop = [];
        if (oldCop[0] > player[0]) {
          newCop.push(oldCop[0] - 1);
        } else if (oldCop[0] < player[0]) {
          newCop.push(oldCop[0] + 1);
        } else {
          newCop.push(oldCop[0]);
        }
        if (oldCop[1] > player[1]) {
          newCop.push(oldCop[1] - 1, "C");
        } else if (oldCop[1] < player[1]) {
          newCop.push(oldCop[1] + 1, "C");
        } else {
          newCop.push(oldCop[1], "C");
        }
        if (
          cops.find((cop) => cop[0] === newCop[0] && cop[1] === newCop[1]) ||
          newCops.find((cop) => cop[0] === newCop[0] && cop[1] === newCop[1]) ||
          okToMoveChecker(grid[newCop[0]][newCop[1]], "cop") === false
        ) {
          if (
            cops.find((cop) => cop[0] === newCop[0] && cop[1] === oldCop[1]) ===
              undefined &&
            newCops.find(
              (cop) => cop[0] === newCop[0] && cop[1] === oldCop[1]
            ) === undefined &&
            okToMoveChecker(grid[newCop[0]][oldCop[1]], "cop") === true
          ) {
            let newCopB = [newCop[0], oldCop[1], "C"];
            newCops.push(newCopB);
          } else if (
            cops.find((cop) => cop[0] === oldCop[0] && cop[1] === newCop[1]) ===
              undefined &&
            newCops.find(
              (cop) => cop[0] === oldCop[0] && cop[1] === newCop[1]
            ) === undefined &&
            okToMoveChecker(grid[oldCop[0]][newCop[1]], "cop") === true
          ) {
            let newCopA = [oldCop[0], newCop[1], "C"];
            newCops.push(newCopA);
          } else {
            newCops.push(oldCop);
          }
        } else if (
          okToMoveChecker(grid[newCop[0]][newCop[1]], "cop") &&
          (okToMoveChecker(grid[oldCop[0]][newCop[1]], "cop") ||
            okToMoveChecker(grid[newCop[0]][oldCop[1]], "cop"))
        ) {
          newCops.push(newCop);
        } else {
          newCops.push(oldCop);
        }
      }
      setCops(newCops);
    };
    if (game[0] === "Playing..." && cops.length > 0) {
      copsMover();
    }
    //-- PROBLEMO
    // eslint-disable-next-line
  }, [counter]);

  //-- autoTuttoSetter
  useEffect(() => {
    const tutoSetter = () => {
      const tuto1 = {
        pattern: [
          ".........",
          "WWWWWWWWW",
          "WB..W...W",
          "W.P.W.P.W",
          "WWHWW...E",
          "W.....p.W",
          "W.......W",
          "WWWWWWWWW",
          ".........",
        ],
        name: "TUTO 1",
        context: "posez la boîte sur la plaque de pression pour sortir",
      };
      const tuto2 = {
        pattern: [
          ".........",
          "WWWWWWWWW",
          "WB..W...W",
          "W...W.P.W",
          "WWKWW...E",
          "W.....p.W",
          "W..1....W",
          "WWWWWWWWW",
          ".........",
        ],
        name: "TUTO 2",
        context: "utilisez la clef pour ouvrir la porte",
      };
      const tuto3 = {
        pattern: [
          "..................",
          "WWWWWWWWWWWWWWWWWW",
          "WB..W.....W......W",
          "W...W..1..W....P.W",
          "WWKWW.....V......E",
          "W.....C...W....p.W",
          "W.........W......W",
          "WWWWWWWWWWWWWWWWWW",
          "..................",
        ],
        name: "TUTO 3",
        context: "évitez les agents!",
      };
      if (levelTitle === "TUTO 1") {
        setLevel(tuto2.pattern);
        setLevelTitle(tuto2.name);
        setLevelContext(tuto2.context);
        setGame(["Ready?", "START"]);
      } else if (levelTitle === "TUTO 2") {
        setLevel(tuto3.pattern);
        setLevelTitle(tuto3.name);
        setLevelContext(tuto3.context);
        setGame(["Ready?", "START"]);
      } else if (levelTitle === "TUTO 3") {
        setLevel(tuto1.pattern);
        setLevelTitle(tuto1.name);
        setLevelContext(tuto1.context);
        setGame(["Ready?", "START"]);
      }
    };
    if (game[0] === "Win!" || game === "lost!") {
      tutoSetter();
    }
  }, [game, setGame, levelTitle, setLevel, setLevelContext, setLevelTitle]);

  //-- pressChecker (vérifie la présence d'un objet sur la presse)
  useEffect(() => {
    //-- pressChecker vérifie la présence d'un objet sur la presse
    const pressChecker = () => {
      let press = objects.find((obj) => obj[2] === "pg");
      let onPressIndex = objects.findIndex(
        (obj) =>
          obj[0] === press[0] &&
          obj[1] === press[1] &&
          obj[2] !== press[2] &&
          obj[2] !== "bs"
      );
      if (onPressIndex >= 0) {
        return true;
      } else if (player[0] === press[0] && player[1] === press[1]) {
        return press;
      } else {
        return false;
      }
    };
    if (objects !== "loading" && pressChecker() !== false) {
      let exitIndex = objects.findIndex((obj) => obj[2] === "E");
      let exit = objects.find((obj) => obj[2] === "E");
      if (exitIndex >= 0) {
        let newObjects = [...objects];
        newObjects.splice(exitIndex, 1, [exit[0], exit[1], "e"]);
        setObjects(newObjects);
      }
    } else if (objects !== "loading" && !pressChecker()) {
      let exitIndex = objects.findIndex((obj) => obj[2] === "e");
      let exit = objects.find((obj) => obj[2] === "e");
      if (exitIndex >= 0) {
        let newObjects = [...objects];
        newObjects.splice(exitIndex, 1, [exit[0], exit[1], "E"]);
        setObjects(newObjects);
      }
    }
  }, [player, objects, game]);

  //-- gridDrawer (dessine le niveau à chaque changement de valeur)
  useEffect(() => {
    let newGrid = [];
    let activity = "none";
    if (objects !== "loading") {
      let activeObj = objects.find((obj) => obj[2] === "bs");
      if (activeObj !== undefined) {
        activity = activeObj[2];
      }
      let exit = objects.find((obj) => obj[2] === "e");
      if (exit && exit[0] === player[0] && exit[1] === player[1]) {
        if (game[0] === "Playing...") {
          setGame(["Win!", "REFRESH"]);
        }
      }
      let caught = cops.findIndex(
        (cop) => cop[0] === player[0] && cop[1] === player[1]
      );
      if (caught >= 0) {
        if (game[0] === "Playing...") {
          setGame(["Lost!", "REFRESH"]);
        }
      }
    }
    for (let L = 0; L < base.length; L++) {
      let newLign = [];
      for (let o = 0; o < base[0].length; o++) {
        let pos = base[L][o];
        if (objects !== "loading") {
          let obj = objects.find(
            (obj) => obj[0] === L && obj[1] === o && obj[2] !== activity
          );
          if (obj !== undefined) {
            pos = obj[2];
          }
        }
        if (cops.length > 0) {
          let copIndex = cops.findIndex((cop) => cop[0] === L && cop[1] === o);
          if (copIndex >= 0) {
            pos = "C";
          }
        }
        if (player[0] === L && player[1] === o) {
          newLign.push("P");
        } else if (player[2] === L && player[3] === o) {
          if (activity === "none") {
            newLign.push(pos + "a");
          } else {
            newLign.push(activity + "a");
          }
        } else {
          newLign.push(pos);
        }
      }
      newGrid.push(newLign);
    }
    setGrid(newGrid);
  }, [game, setGame, base, player, objects, cops, displayPad]);

  ///-- RENDER --///
  return (
    <main
      className="gamePage"
      style={
        displayPad
          ? { flexDirection: "row" }
          : bigScreen
          ? { height: "100%" }
          : { flexDirection: "column" }
      }
    >
      <section
        className="boardContainer"
        style={
          bigScreen
            ? { minWidth: "100vw", height: "100vh", border: "inherit" }
            : { maxWidth: "42.7rem" }
        }
      >
        <LevelsSlide
          level={level}
          setLevel={setLevel}
          setLevelTitle={setLevelTitle}
          setLevelContext={setLevelContext}
          setDisplayContext={setDisplayContext}
          game={game}
          levels={levels}
          setLevels={setLevels}
          setBigScreen={setBigScreen}
          displayLevels={displayLevels}
          setDisplayLevels={setDisplayLevels}
          setDisplayAys={setDisplayAys}
        />
        {location.pathname === "/game/game" && (
          <button
            className={
              game[0] !== "Playing..."
                ? "gameToEditButton"
                : "gameToEditButton2"
            }
            onClick={() => {
              gameQuiter("editor");
            }}
          >
            e
          </button>
        )}
        <button
          className={bigScreen ? "reduceScreen" : "enlargeScreen"}
          onClick={screenToggler}
        >
          {bigScreen ? "↘" : "↖"}
        </button>
        {displayContext ? (
          <button
            className={
              game[0] !== "Playing..."
                ? "contextDisplayer"
                : "contextDisplayer2"
            }
            onClick={() => {
              contextToggler();
            }}
          >
            <p className="levelContextTitle">{levelTitle}:</p>
            <p className="levelContextContext">{levelContext}</p>
          </button>
        ) : (
          <button
            className={
              game[0] !== "Playing..." ? "contextButton" : "contextButton2"
            }
            onClick={() => {
              contextToggler();
            }}
          >
            c
          </button>
        )}
        {location.pathname === "/game/editor" && (
          <button
            className="backToEdit"
            onClick={() => {
              navigate("/editor");
            }}
          >
            back to edit
          </button>
        )}
        {game[0] !== "Playing..." && cops.length > 0 && (
          <div className="difficultyDisplay">
            <button
              className="difficultyButtonHard"
              onClick={() => {
                difficultySetter("hard");
              }}
              style={
                difficulty === "hard"
                  ? { backgroundColor: "black", color: "white" }
                  : {}
              }
            >
              HARD
            </button>
            <button
              className="difficultyButtonMedium"
              onClick={() => {
                difficultySetter("medium");
              }}
              style={
                difficulty === "medium"
                  ? { backgroundColor: "black", color: "white" }
                  : {}
              }
            >
              MEDIUM
            </button>
            <button
              className="difficultyButtonEasy"
              onClick={() => {
                difficultySetter("easy");
              }}
              style={
                difficulty === "easy"
                  ? { backgroundColor: "black", color: "white" }
                  : {}
              }
            >
              EASY
            </button>
          </div>
        )}
        <div className={bigScreen ? "commandInfoLarge" : "commandInfo"}>
          {displayPad === false && (
            <button
              className="commandInfoButton"
              onClick={() => {
                infoToggler();
              }}
            >
              {displayInfo ? "X" : "KEY"}
            </button>
          )}
          {displayInfo === false && (
            <button
              className="padButton"
              onClick={() => {
                padToggler();
              }}
            >
              {displayPad ? "X" : "PAD"}
            </button>
          )}
        </div>
        <div className="boardScroller">
          {level !== "none" && grid !== "loading" ? (
            <div className="table">
              {grid.map((L, indexL) => {
                return (
                  <div className="ligns" key={indexL}>
                    {L.map((o, indexo) => {
                      return (
                        <div key={indexo}>
                          {o === "P" ? (
                            <div id="player" ref={titleRef}>
                              <Pos o={o} bigScreen={bigScreen} />
                            </div>
                          ) : (
                            <Pos o={o} bigScreen={bigScreen} />
                          )}
                        </div>
                      );
                    })}
                  </div>
                );
              })}
            </div>
          ) : (
            <div>chargement du niveau</div>
          )}
          <div className="boardScrollerBlank"></div>
        </div>
        {displayPad && (
          <section className="padContainer">
            <div className="pad">
              <div className="padLigns">
                <button
                  className="padArrowUp"
                  onClick={() => handleKeyDown("pad", "ArrowUp")}
                ></button>
              </div>
              <div className="padLigns">
                <button
                  className="padArrowLeft"
                  onClick={() => handleKeyDown("pad", "ArrowLeft")}
                ></button>
                <button
                  className="padActivity"
                  onClick={() => handleKeyDown("pad", "a")}
                >
                  {action}
                </button>
                <button
                  className="padArrowRight"
                  onClick={() => handleKeyDown("pad", "ArrowRight")}
                ></button>
              </div>
              <div className="padLigns">
                <button
                  className="padArrowDown"
                  onClick={() => handleKeyDown("pad", "ArrowDown")}
                ></button>
              </div>
            </div>
          </section>
        )}
        {displayInfo && (
          <section
            className="infoContainer"
            onMouseLeave={() => {
              setDisplayInfo(false);
            }}
          >
            <p className="keyInfo">
              utilisez la touche <span className="keyInfoSpan">"entrée"</span>{" "}
              pour arréter/démarrer le jeu, les{" "}
              <span className="keyInfoSpan">flèches</span> pour vous déplacer et
              la touche <span className="keyInfoSpan">"a"</span> pour intéragir.
            </p>
            <p className="keyInfo">
              vous pouver utiliser la touche{" "}
              <span className="keyInfoSpan">"r"</span> pour redémarrer le jeu.
            </p>
          </section>
        )}
        {game[0] !== "Playing..." && level !== "none" && (
          <article className="startPopper">
            <div className="startButtonContainer">
              <button
                className="startButton"
                onClick={() => {
                  console.log(game);
                  starter();
                }}
              >
                {game[1]}
              </button>
              {game[0] === "Pause..." && (
                <button
                  className="startButton"
                  onClick={() => {
                    starter("refresh");
                  }}
                >
                  {game[2]}
                </button>
              )}
            </div>
          </article>
        )}
      </section>
    </main>
  );
};

export default GamePage;
