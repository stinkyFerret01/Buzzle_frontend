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
    let blocker = ["W", "B", "D"];
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
    let pairs = [
      ["Dv", "dv"],
      ["Dh", "dh"],
      ["Bs", "bs"],
    ];
    let mod = pairs.find((pair) => pair[0] === obj || pair[1] === obj);
    if (obj === mod[0]) {
      // return mod[1];
      return [player[2], player[3], mod[1]];
    } else if (obj === mod[1]) {
      // return mod[0];
      return [player[2], player[3], mod[0]];
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
        let objIndex = objects.findIndex(
          (obj) => obj[0] === player[2] && obj[1] === player[3]
        );
        let object = objects.find(
          (obj) => obj[0] === player[2] && obj[1] === player[3]
        );
        if (object === undefined) {
          objIndex = objects.findIndex((obj) => obj[2] === "bs");
          object = objects.find((obj) => obj[2] === "bs");
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
      "W...........W...W..W",
      "W.B.........W...W..W",
      "W...........W...W..W",
      "W...........WWHWW..W",
      "W.Pa...............W",
      "W..............WWWWW",
      "W....B.........W...W",
      "W..............V...W",
      "W..............W...W",
      "WWWWWWWWWWWWWWWWWWWW",
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
          }
          if (pos === "V") {
            baseObjects.push([L, o, "Dv"]);
          }
          if (pos === "v") {
            baseObjects.push([L, o, "dv"]);
          }
          if (pos === "H") {
            baseObjects.push([L, o, "Dh"]);
          }
          if (pos === "h") {
            baseObjects.push([L, o, "dh"]);
          }
          if (pos === "B") {
            baseObjects.push([L, o, "Bs"]);
          }
          if (pos === "k") {
            baseObjects.push([L, o, "Lv1"]);
          } else if (pos === "K") {
            baseObjects.push([L, o, "Lh1"]);
          } else if (pos === "l") {
            baseObjects.push([L, o, "Lv2"]);
          } else if (pos === "L") {
            baseObjects.push([L, o, "Lh2"]);
          } else if (pos === "m") {
            baseObjects.push([L, o, "Lv3"]);
          } else if (pos === "M") {
            baseObjects.push([L, o, "Lh3"]);
          }
          if (pos === "a") {
            basePlayer.push(L, o);
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
          let obj = objects.find((obj) => obj[0] === L && obj[1] === o);
          if (obj !== undefined && obj[2] !== activity) {
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
