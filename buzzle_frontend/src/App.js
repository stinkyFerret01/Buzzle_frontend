import "./App.css";
import { useEffect } from "react";
import { useState } from "react";

function App() {
  const [base, setBase] = useState("loading");
  const [player, setPlayer] = useState("loading");
  const [grid, setGrid] = useState(base);

  //--baseBuilder
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
      Spawn: [5, 2],
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
    //-- ici, je
    setBase(baseBuilder(level.base));
  }, []);

  //-- gridDrawer
  useEffect(() => {
    let newGrid = [];
    for (let L = 0; L < base.length; L++) {
      let newLign = [];
      for (let o = 0; o < base[0].length; o++) {
        newLign.push("y");
      }
      newGrid.push(newLign);
    }
    setGrid(newGrid);
  }, [base]);

  return (
    <div className="App">
      <section>
        {grid !== "loading" ? (
          <div className="table">
            {grid.map((L, indexL) => {
              return (
                <div className="ligns" key={indexL}>
                  {L.map((o, indexo) => {
                    return (
                      <div className="pos" key={indexo}>
                        {o}
                      </div>
                    );
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
