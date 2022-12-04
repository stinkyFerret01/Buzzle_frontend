//-- CONFIG
import "./App.css";
import { useEffect } from "react";
import { useState } from "react";

//-- import des composants
import Pos from "./components/pos";

//-- START
function App() {
  //-- STATES
  const [base, setBase] = useState("loading");
  const [player, setPlayer] = useState("loading");
  const [grid, setGrid] = useState(base);

  //-- FONCTIONS
  const okToMoveChecker = (o) => {
    if (o === "W") {
      return false;
    } else {
      return true;
    }
  };

  const handleKeyDown = (event) => {
    if (player !== "loading") {
      if (event.key === "ArrowLeft") {
        let newPos = [player[0], player[1] - 1, player[0], player[1] - 2];
        let o = grid[newPos[0]][newPos[1]];
        if (okToMoveChecker(o)) {
          setPlayer(newPos);
        } else {
          newPos = [player[0], player[1], player[0], player[1] - 1];
          setPlayer(newPos);
        }
      }
      if (event.key === "ArrowRight") {
        let newPos = [player[0], player[1] + 1, player[0], player[1] + 2];
        let o = grid[newPos[0]][newPos[1]];
        if (okToMoveChecker(o)) {
          setPlayer(newPos);
        } else {
          newPos = [player[0], player[1], player[0], player[1] + 1];
          setPlayer(newPos);
        }
      }
      if (event.key === "ArrowUp") {
        let newPos = [player[0] - 1, player[1], player[0] - 2, player[1]];
        let o = grid[newPos[0]][newPos[1]];
        if (okToMoveChecker(o)) {
          setPlayer(newPos);
        } else {
          newPos = [player[0], player[1], player[0] - 1, player[1]];
          setPlayer(newPos);
        }
      }
      if (event.key === "ArrowDown") {
        let newPos = [player[0] + 1, player[1], player[0] + 2, player[1]];
        let o = grid[newPos[0]][newPos[1]];
        console.log(o);
        if (okToMoveChecker(o)) {
          setPlayer(newPos);
        } else {
          newPos = [player[0], player[1], player[0] + 1, player[1]];
          setPlayer(newPos);
        }
      }
    }
  };

  //-- keyboardListener
  useEffect(() => {
    //-- Add event listener on keydown
    window.removeEventListener("keydown", handleKeyDown);
    window.addEventListener("keydown", handleKeyDown);
    // cleanup this component
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [player, grid]);

  //-- gameBuilder (prépare le niveau)
  useEffect(() => {
    //-- level est provisoire
    const level = {
      base: [
        "WWWWWWWWWWWWWWWWWWWW",
        "W..................W",
        "W..................W",
        "W..................W",
        "W..................W",
        "W..................W",
        "W..................W",
        "W..................W",
        "W..................W",
        "W..................W",
        "WWWWWWWWWWWWWWWWWWWW",
      ],
      spawn: [5, 2, 5, 3],
    };
    //-- baseBuilder construit le tableau du niveau choisi
    const baseBuilder = (lvl) => {
      let base = [];
      for (let L = 0; L < lvl.length; L++) {
        let lign = [];
        for (let o = 0; o < lvl[0].length; o++) {
          lign.push(lvl[L][o]);
        }
        base.push(lign);
      }
      return base;
    };
    setBase(baseBuilder(level.base));
    setPlayer(level.spawn);
  }, []);

  //-- gridDrawer
  useEffect(() => {
    let newGrid = [];
    for (let L = 0; L < base.length; L++) {
      let newLign = [];
      for (let o = 0; o < base[0].length; o++) {
        let pos = base[L][o];
        if (player[0] === L && player[1] === o) {
          newLign.push("P");
        } else if (player[2] === L && player[3] === o) {
          newLign.push(pos + "a");
        } else {
          newLign.push(pos);
        }
      }
      newGrid.push(newLign);
    }
    setGrid(newGrid);
  }, [base, player]);

  //-- RENDER
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
