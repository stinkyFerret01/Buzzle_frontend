///-- CONFIG --///
//-- import librairie
import { useState, useEffect } from "react";

//-- import des composants
import Pos from "./pos";

///-- START --///
const EditorPage = () => {
  ///-- STATES --///
  const [ligns, setLigns] = useState(8);
  const [colons, setColons] = useState(7);
  const [oSelection, setOSelection] = useState("W");
  const [oMessage, setOMessage] = useState("mur");
  const [base, setBase] = useState("loading");

  const os = {
    lockedDoors: ["Kh", "Kv", "kg", "Lh", "Lv", "lg", "Mh", "Mv", "mg"],
    necessary: ["a", "P", "W", "."],
    objects: ["Dh", "Dv", "E", "pg", "Bs", "C"],
  };
  // const os = [
  //   "a",
  //   "Bs",
  //   "C",
  //   "Dh",
  //   "Dv",
  //   "E",
  //   "Kh",
  //   "Kv",
  //   "kg",
  //   "Lh",
  //   "Lv",
  //   "lg",
  //   "Mh",
  //   "Mv",
  //   "mg",
  //   "pg",
  //   "P",
  //   "W",
  //   ".",
  // ];

  //-- USEEFFECT
  //-- baseBuilder

  useEffect(() => {
    //-- baseBuilder construit le tableau du niveau choisi
    const baseBuilder = (li, co) => {
      let base = [];
      for (let L = 0; L < li + 2; L++) {
        let lign = [];
        for (let o = 0; o < co; o++) {
          if (L === 0 || L === li + 1) {
            lign.push(".");
          } else if (L === 1 || L === li || o === 0 || o === co - 1) {
            lign.push("W");
          } else {
            lign.push(".");
          }
        }
        base.push(lign);
      }
      return base;
    };
    setBase(baseBuilder(parseInt(ligns), parseInt(colons)));
  }, [ligns, colons]);

  useEffect(() => {}, [oMessage]);

  ///-- RENDER --///
  return (
    <main className="editorPage">
      <section className="editView">
        {base !== "loading" ? (
          <div className="table">
            {base.map((L, indexL) => {
              return (
                <div className="ligns" key={indexL}>
                  {L.map((o, indexo) => {
                    return (
                      <Pos
                        o={o}
                        type="edit"
                        oSelection={oSelection}
                        setOSelection={setOSelection}
                        base={base}
                        setBase={setBase}
                        xy={[indexL, indexo]}
                        key={indexo}
                      />
                    );
                  })}
                </div>
              );
            })}
          </div>
        ) : (
          <div>chargement du niveau</div>
        )}
      </section>
      <section className="editShop">
        <h4>éléments:</h4>
        <div className="shopList">
          <article className="shopCategory">
            {os.lockedDoors.map((o, indexo) => {
              return (
                <Pos
                  o={o}
                  setOSelection={setOSelection}
                  setOMessage={setOMessage}
                  type="choose"
                  key={indexo}
                />
              );
            })}
          </article>
          <article className="shopCategory">
            {os.objects.map((o, indexo) => {
              return (
                <Pos
                  o={o}
                  setOSelection={setOSelection}
                  setOMessage={setOMessage}
                  type="choose"
                  key={indexo}
                />
              );
            })}
          </article>
          <article className="shopCategory">
            {os.necessary.map((o, indexo) => {
              return (
                <Pos
                  o={o}
                  setOSelection={setOSelection}
                  setOMessage={setOMessage}
                  type="choose"
                  key={indexo}
                />
              );
            })}
          </article>
        </div>
        <h5>{oMessage}</h5>
        <input
          className="formInputs"
          placeholder="ligns"
          value={ligns}
          onChange={(event) => {
            setLigns(event.target.value);
          }}
        />
        <input
          className="formInputs"
          placeholder="colons"
          value={colons}
          onChange={(event) => {
            setColons(event.target.value);
          }}
        />
      </section>
    </main>
  );
};

export default EditorPage;
