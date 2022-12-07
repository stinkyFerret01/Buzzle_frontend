///-- CONFIG --///
//-- import style et librairie
import "./App.css";
import { useState, useEffect } from "react";

//-- import des composants
import Pos from "./components/pos";

///-- START --///
function App() {
  ///-- STATES --///
  const [base, setBase] = useState("loading");
  const [player, setPlayer] = useState("loading");
  const [objects, setObjects] = useState("loading");
  const [grid, setGrid] = useState(base);

  ///-- FONCTIONS --///
  //-- okToMoveChecker vérifie si le déplacement du joueur est possible
  const okToMoveChecker = (o) => {
    let oStrict = o.slice(0, 1);
    let oObj = o.slice(0, 2);
    // let act = o.slice(o.length - 1);
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
  const handleKeyDown = (event) => {
    let actChecker = objects.find((obj) => obj[2] === "bs");
    if (player !== "loading") {
      if (event.key === "ArrowLeft") {
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
      if (event.key === "ArrowRight") {
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
      if (event.key === "ArrowUp") {
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
      if (event.key === "ArrowDown") {
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
      if (event.key === "a") {
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
    console.log("use1");
    window.removeEventListener("keydown", handleKeyDown);
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
    //////------ PROBLEMO ------//////
    // eslint-disable-next-line
  }, [player, grid]);

  //-- gameBuilder (prépare le niveau en début de partie)
  useEffect(() => {
    ////////////////////////////
    //-- level est provisoire
    const level = [
      "....................",
      "WWWWWWWWWWWWWWWWWWWW",
      "W.BBBBBBB......W...W",
      "W..............W.3.W",
      "W.Pa.....1.....W...W",
      "W..............WWLWW",
      "W......p...........W",
      "WWWWW..........WWKWW",
      "W...W..........W...W",
      "W.B.m.....2....W.B.W",
      "W...W..........W...W",
      "WWEWWWWWWWWWWWWWWWWW",
      "....................",
    ];
    ////////////////////////////
    //-- baseBuilder construit le tableau du niveau choisi
    const baseBuilder = (lvl) => {
      let base = [];
      let basePlayer = [];
      let baseObjects = [];
      for (let L = 0; L < lvl.length; L++) {
        let lign = [];
        for (let o = 0; o < lvl[0].length; o++) {
          let pos = lvl[L][o];
          if (pos === "W") {
            lign.push(pos);
          } else {
            lign.push(".");
          }
          if (pos === "P") {
            basePlayer.unshift(L, o);
          } else if (pos === "a") {
            basePlayer.push(L, o);
          } else if (pos === "E") {
            baseObjects.push([L, o, "E"]);
          } else if (pos === "V") {
            baseObjects.push([L, o, "Dv"]);
          } else if (pos === "v") {
            baseObjects.push([L, o, "dv"]);
          } else if (pos === "H") {
            baseObjects.push([L, o, "Dh"]);
          } else if (pos === "h") {
            baseObjects.push([L, o, "dh"]);
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
          } else if (pos === "1") {
            baseObjects.push([L, o, "kg"]);
          } else if (pos === "2") {
            baseObjects.push([L, o, "lg"]);
          } else if (pos === "3") {
            baseObjects.push([L, o, "mg"]);
          } else if (pos === "B") {
            baseObjects.unshift([L, o, "Bs"]);
          } else if (pos === "p") {
            baseObjects.push([L, o, "pg"]);
          }
        }
        base.push(lign);
      }
      setPlayer(basePlayer);
      setObjects(baseObjects);
      return base;
    };
    setBase(baseBuilder(level));
  }, []);

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
        return true;
      } else {
        return false;
      }
    };
    if (objects !== "loading" && pressChecker()) {
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
  }, [player, objects]);

  //-- gridDrawer (dessine le niveau à chaque changement de valeur)
  useEffect(() => {
    let newGrid = [];
    let activity = "none";
    if (objects !== "loading") {
      let activeObj = objects.find((obj) => obj[2] === "bs");
      if (activeObj !== undefined) {
        activity = activeObj[2];
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
  }, [base, player, objects]);

  ///-- RENDER --///
  return (
    <div className="App">
      <section>
        {grid !== "loading" ? (
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
          <div>yo</div>
        )}
      </section>
    </div>
  );
}

export default App;
