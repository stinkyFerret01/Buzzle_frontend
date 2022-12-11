///-- CONFIG --///
//-- import librairie
import { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";

//-- import des composants
import Pos from "./pos";

const GamePage = ({ level, setLevel, bigScreen, setBigScreen }) => {
  ///-- STATES --///
  const [displayPad, setDisplayPad] = useState(false);
  const [game, setGame] = useState(["Ready?", "START"]);
  const [base, setBase] = useState("loading");
  const [player, setPlayer] = useState("loading");
  const [objects, setObjects] = useState("loading");
  const [cops, setCops] = useState("loading");
  const [grid, setGrid] = useState(base);
  const [action, setAction] = useState("");

  ///////////////////////////////////////////
  const titleRef = useRef();
  const handleBackClick = () => {
    console.log("active");
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

  //-- okToMoveChecker vérifie si le déplacement du joueur est possible
  const okToMoveChecker = (o) => {
    let oStrict = o.slice(0, 1);
    let blocker = ["W", "B", "D", "K", "L", "M", "E"];
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

  //-- handleKeyDown interprète les commandes du clavier
  const handleKeyDown = (event, k) => {
    if (game[0] === "Playing...") {
      handleBackClick();
      let key = event.key;
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
              okToMoveChecker(oAct))
          ) {
            setPlayer(newPos);
          } else if (
            actChecker === undefined ||
            (okToMoveChecker(o) && !okToMoveChecker(oAct))
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
              okToMoveChecker(oAct))
          ) {
            setPlayer(newPos);
          } else if (
            actChecker === undefined ||
            (okToMoveChecker(o) && !okToMoveChecker(oAct))
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
              okToMoveChecker(oAct))
          ) {
            setPlayer(newPos);
          } else if (
            actChecker === undefined ||
            (okToMoveChecker(o) && !okToMoveChecker(oAct))
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
              okToMoveChecker(oAct))
          ) {
            setPlayer(newPos);
          } else if (
            actChecker === undefined ||
            (okToMoveChecker(o) && !okToMoveChecker(oAct))
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
  }, [level]);

  //-- presLevel (défini le niveau par défault (en dur))
  useEffect(() => {
    if (level === "none") {
      const presLvl = [
        ".........",
        "WWWWWWWWW",
        "WB..W...W",
        "W.P.W.P.W",
        "WWHWW...E",
        "W.....p.W",
        "W.......W",
        "WWWWWWWWW",
        ".........",
      ];
      ////////////////////
      // let presLvl2 = [
      //   ".........",
      //   "WWWWWWWWW",
      //   "WB..W...W",
      //   "W.P.W.P.W",
      //   "WWHWW...E",
      //   "W.....p.W",
      //   "W.......W",
      //   "WWWWWWWWW",
      //   ".........",
      // ];
      // if ((presLvl2 = presLvl)) {
      // }

      ////////////////////
      setLevel(presLvl);
      setGame(["Ready?", "START"]);
    }
  }, [level, setLevel, base]);

  //-- copsMover (gère le déplacement des agents)
  //-- (PROBEMO dépendance player)
  useEffect(() => {
    let interval;
    if (game[0] === "Playing...") {
      clearTimeout(interval);
    }
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
          okToMoveChecker(grid[newCop[0]][newCop[1]]) === false
        ) {
          if (
            cops.find((cop) => cop[0] === newCop[0] && cop[1] === oldCop[1]) ===
              undefined &&
            newCops.find(
              (cop) => cop[0] === newCop[0] && cop[1] === oldCop[1]
            ) === undefined &&
            okToMoveChecker(grid[newCop[0]][oldCop[1]]) === true
          ) {
            let newCopB = [newCop[0], oldCop[1], "C"];
            newCops.push(newCopB);
          } else if (
            cops.find((cop) => cop[0] === oldCop[0] && cop[1] === newCop[1]) ===
              undefined &&
            newCops.find(
              (cop) => cop[0] === oldCop[0] && cop[1] === newCop[1]
            ) === undefined &&
            okToMoveChecker(grid[oldCop[0]][newCop[1]]) === true
          ) {
            let newCopA = [oldCop[0], newCop[1], "C"];
            newCops.push(newCopA);
          } else {
            newCops.push(oldCop);
          }
        } else {
          newCops.push(newCop);
        }
      }
      const checkStart = () => {
        if (game[0] === "Playing...") {
          setCops(newCops);
          clearTimeout(interval);
        } else {
          clearTimeout(interval);
        }
      };
      interval = setTimeout(checkStart, 600);
    };
    if (game[0] === "Playing..." && cops.length > 0) {
      copsMover();
    }
    //-- PROBLEMO
    // eslint-disable-next-line
  }, [game, cops]);

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
    if (objects !== "loading" && cops !== "loading") {
      let activeObj = objects.find((obj) => obj[2] === "bs");
      if (activeObj !== undefined) {
        activity = activeObj[2];
      }
      let exit = objects.find((obj) => obj[2] === "e");
      if (exit && exit[0] === player[0] && exit[1] === player[1]) {
        setGame(["Win!", "REFRESH"]);
      }
      let caught = cops.findIndex(
        (cop) => cop[0] === player[0] && cop[1] === player[1]
      );
      if (caught >= 0) {
        setGame(["Lost!", "REFRESH"]);
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
        if (cops !== "loading" && cops.length > 0) {
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
  }, [base, player, objects, cops, displayPad]);

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
          displayPad
            ? { maxWidth: "31.7rem" }
            : bigScreen
            ? { maxWidth: "100%", maxHeight: "100%" }
            : { maxWidth: "42.7rem" }
        }
      >
        <button className="enlargeScreen" onClick={screenToggler}></button>
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
        {game[0] !== "Playing..." && level !== "none" && (
          <article className="startPopper">
            <button
              className="startButton"
              onClick={() => {
                if (game[0] === "Win!" || game[0] === "Lost!") {
                  let refresh = [...level];
                  setLevel(refresh);
                } else {
                  setGame(["Playing...", "STOP"]);
                }
              }}
            >
              {game[1]}
            </button>
          </article>
        )}
      </section>
      <section
        className={displayPad === true ? "padContainer" : "padContainerOff"}
      >
        {displayPad ? (
          <section className="padIsTrue">
            <button className="padButton" onClick={() => setDisplayPad(false)}>
              fermer le pad
            </button>
            <div className="padMessage">{action}</div>
            <div className="pad">
              <div className="padLigns">
                <button
                  className="padArrow"
                  onClick={() => handleKeyDown("pad", "ArrowUp")}
                >
                  up
                </button>
              </div>
              <div className="padLigns">
                <button
                  className="padArrow"
                  onClick={() => handleKeyDown("pad", "ArrowLeft")}
                >
                  left
                </button>
                <button
                  className="padActivity"
                  onClick={() => handleKeyDown("pad", "a")}
                >
                  action
                </button>
                <button
                  className="padArrow"
                  onClick={() => handleKeyDown("pad", "ArrowRight")}
                >
                  right
                </button>
              </div>
              <div className="padLigns">
                <button
                  className="padArrow"
                  onClick={() => handleKeyDown("pad", "ArrowDown")}
                >
                  down
                </button>
              </div>
            </div>
            {location.pathname === "/game/editor" && (
              <button onClick={() => navigate("/editor")}>back to edit</button>
            )}
          </section>
        ) : (
          <button className="padButton" onClick={() => setDisplayPad(true)}>
            ouvrir le pad
          </button>
        )}
      </section>
    </main>
  );
};

export default GamePage;
