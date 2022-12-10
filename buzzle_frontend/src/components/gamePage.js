///-- CONFIG --///
//-- import librairie
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

//-- import des composants
import Pos from "./pos";

const GamePage = ({ level, setLevel, edited }) => {
  ///-- STATES --///
  const [displayPad, setDisplayPad] = useState(true);
  const [game, setGame] = useState(["Ready?", "START"]);
  const [base, setBase] = useState("loading");
  const [player, setPlayer] = useState("loading");
  const [objects, setObjects] = useState("loading");
  const [cops, setCops] = useState("loading");
  const [grid, setGrid] = useState(base);
  if (cops) {
  }

  const navigate = useNavigate();

  ///-- FONCTIONS --///
  //-- okToMoveChecker vérifie si le déplacement du joueur est possible
  const okToMoveChecker = (o) => {
    let oStrict = o.slice(0, 1);
    let oObj = o.slice(0, 2);
    let blocker = ["W", "B", "D", "K", "L", "M"];
    let exept = ["Bh"];
    let blockerTest = blocker.findIndex((block) => block === oStrict);
    let exeptTest = exept.findIndex((exep) => exep === oObj);
    if (blockerTest >= 0 && exeptTest < 0) {
      return false;
    } else {
      return true;
    }
  };

  //-- actioner défini la nouvelle valeur d'un object après une action du joueur
  const actioner = (obj) => {
    console.log(obj);
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
    let key = event.key;
    if (event === "pad") {
      key = k;
    }
    let actChecker = objects.find((obj) => obj[2] === "bs");
    if (player !== "loading" && game[0] === "Playing...") {
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
  };

  ///--USEEFFECT --///
  //-- keyboardListener (reçois et transmet les commandes claviers)
  useEffect(() => {
    console.log("use 1");
    window.removeEventListener("keydown", handleKeyDown);
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
    //////------ PROBLEMO ------//////
    // eslint-disable-next-line
  }, [game, player, grid]);

  //-- gameBuilder (prépare le niveau en début de partie)
  useEffect(() => {
    console.log("use 2");
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

  useEffect(() => {
    // if (location.pathname === "/game/editor") {
    //   setLevel(edited);
    // }
  }, [edited]);

  //-- pressChecker (vérifie la présence d'un objet sur la presse)
  useEffect(() => {
    console.log("use 3");
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
      console.log(pressChecker());
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
    console.log("use 4");
    let newGrid = [];
    let activity = "none";
    if (objects !== "loading") {
      let activeObj = objects.find((obj) => obj[2] === "bs");
      if (activeObj !== undefined) {
        activity = activeObj[2];
      }
      let exit = objects.find((obj) => obj[2] === "e");
      if (exit && exit[0] === player[0] && exit[1] === player[1]) {
        setGame(["Win!", "REFRESH"]);
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
  }, [base, player, objects, displayPad]);

  ///-- RENDER --///
  return (
    <main
      className="gamePage"
      style={
        displayPad === true
          ? { flexDirection: "row" }
          : { flexDirection: "column" }
      }
    >
      <section className="boardContainer">
        <div className="boardScroller">
          {level !== "none" && grid !== "loading" ? (
            <div className="table">
              {grid.map((L, indexL) => {
                return (
                  <div className="ligns" key={indexL}>
                    {L.map((o, indexo) => {
                      return <Pos o={o} key={indexo} />;
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
        className="padContainer"
        style={displayPad === true ? {} : { height: "2rem", width: "6rem" }}
      >
        {displayPad ? (
          <section className="padIsTrue">
            <button onClick={() => setDisplayPad(false)}>no pad</button>
            <div className="padMessage">En Cours</div>
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
            <button onClick={() => navigate("/editor")}>back to edit</button>
          </section>
        ) : (
          <button onClick={() => setDisplayPad(true)}>go pad</button>
        )}
      </section>
    </main>
  );
};

export default GamePage;
