///-- CONFIG --///
//-- import librairie
import { useState, useEffect } from "react";
import * as React from "react";
import { Range } from "react-range";

//-- import des composants
import Pos from "./pos";

///-- START --///
const EditorPage = ({ setEdited }) => {
  ///-- STATES --///
  const [ligns, setLigns] = useState(10);
  const [colons, setColons] = useState(10);
  const [oSelection, setOSelection] = useState("W");
  const [oMessage, setOMessage] = useState(["mur"]);
  const [base, setBase] = useState("loading");
  const [lvlName, setLvlName] = useState("");
  const [lvlStatus] = useState("new");

  //-- liste des object à sélectioner
  const os = {
    necessary: ["a", "P", "E", "pg", "Bs"],
    basics: ["W", "."],
    objects: [
      "Kh",
      "Kv",
      "kg",
      "Lh",
      "Lv",
      "lg",
      "Mh",
      "Mv",
      "mg",
      "Dh",
      "Dv",
      "C",
    ],
    lockedDoors: [],
    others: [],
  };

  ///-- FONCTIONS --///
  //- none

  ///-- USEEFFECT --///
  //-- baseBuilder (construit la base)
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

  //-- patternBuilder (construit le pattern pour l'édition)
  useEffect(() => {
    const patternBuilder = (ba) => {
      let necs = [];
      let pairs = [
        ["p", "pg"],
        ["B", "Bs"],
        ["H", "Dh"],
        ["V", "Dv"],
        ["1", "kg"],
        ["K", "Kh"],
        ["k", "Kv"],
        ["2", "lg"],
        ["L", "Lh"],
        ["l", "Lv"],
        ["3", "mg"],
        ["M", "Mh"],
        ["m", "Mv"],
      ];
      let necsToCheck = ["a", "Bs", "E", "pg", "P"];
      let pattern = [];
      for (let L = 0; L < ba.length; L++) {
        let newLign = "";
        for (let o = 0; o < ba[0].length; o++) {
          let newO = ba[L][o];
          let necToCheckIndex = necsToCheck.findIndex((nec) => nec === newO);
          if (necToCheckIndex >= 0) {
            let necIndex = necs.findIndex((nec) => nec === newO);
            if (necIndex < 0) {
              necs.push(newO);
            }
          }
          let newOIndex = pairs.findIndex((pair) => pair[1] === newO);
          if (newOIndex >= 0) {
            newO = pairs[newOIndex][0];
          }
          newLign = newLign + newO;
        }
        pattern.push(newLign);
        if (necs.length === necsToCheck.length) {
          setEdited([pattern, lvlName, lvlStatus]);
        } else {
          setEdited(["none", lvlName, lvlStatus]);
        }
      }
    };
    base !== "loading" && patternBuilder(base);
  }, [base, setEdited, lvlName, lvlStatus]);

  useEffect(() => {}, [oMessage]);

  ///-- RENDER --///
  return (
    <main className="editorPage">
      <section className="editView">
        <div className="editViewTop">
          <div className="editBlankHorizontal"></div>
          <Range
            step={1}
            min={4}
            max={24}
            values={[colons]}
            onChange={(values) => {
              setColons(values[0]);
            }}
            renderTrack={({ props, children }) => (
              <div
                {...props}
                style={{
                  ...props.style,
                  height: "6px",
                  width: "19.9rem",
                  minWidth: "19.9rem",
                  backgroundColor: "#ccc",
                }}
              >
                {children}
              </div>
            )}
            renderThumb={({ props }) => (
              <div
                {...props}
                style={{
                  ...props.style,
                  height: "2rem",
                  width: "2rem",
                  backgroundColor: "#999",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: "4px",
                }}
              >
                {colons}
              </div>
            )}
          />
        </div>
        <div className="editViewBottom">
          <div className="editRangeVertical">
            <div className="editBlankVertical"></div>
            <Range
              step={1}
              min={4}
              max={20}
              values={[ligns]}
              onChange={(values) => {
                setLigns(values[0]);
              }}
              direction={"to bottom"}
              renderTrack={({ props, children }) => (
                <div
                  {...props}
                  style={{
                    ...props.style,
                    width: "6px",
                    height: "16rem",
                    minHeight: "16rem",
                    backgroundColor: "#ccc",
                  }}
                >
                  {children}
                </div>
              )}
              renderThumb={({ props }) => (
                <div
                  {...props}
                  style={{
                    ...props.style,
                    height: "2rem",
                    width: "2rem",
                    backgroundColor: "#999",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: "4px",
                  }}
                >
                  {ligns}
                </div>
              )}
            />
          </div>
          {base !== "loading" ? (
            <div className="editTable">
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
        </div>
      </section>
      <section className="editShop">
        <h4>éléments:</h4>
        <div className="shopLists">
          <div className="shopList">
            <h5>nécessaires</h5>
            <article className="shopCategory">
              {os.necessary.map((o, indexo) => {
                return (
                  <div className="posSpacer">
                    <Pos
                      o={o}
                      setOSelection={setOSelection}
                      setOMessage={setOMessage}
                      type="choose"
                      key={indexo}
                    />
                  </div>
                );
              })}
            </article>
            <h5>basiques</h5>
            <article className="shopCategory">
              {os.basics.map((o, indexo) => {
                return (
                  <div className="posSpacer">
                    <Pos
                      o={o}
                      setOSelection={setOSelection}
                      setOMessage={setOMessage}
                      type="choose"
                      key={indexo}
                    />
                  </div>
                );
              })}
            </article>
          </div>
          <div className="shopList">
            <h5>optionels</h5>
            <article className="shopCategory">
              {os.objects.map((o, indexo) => {
                return (
                  <div className="posSpacer">
                    <Pos
                      o={o}
                      setOSelection={setOSelection}
                      setOMessage={setOMessage}
                      type="choose"
                      key={indexo}
                    />
                  </div>
                );
              })}
            </article>
            <article className="shopCategory">
              {os.others.map((o, indexo) => {
                return (
                  <div className="posSpacer">
                    <Pos
                      o={o}
                      setOSelection={setOSelection}
                      setOMessage={setOMessage}
                      type="choose"
                      key={indexo}
                    />
                  </div>
                );
              })}
            </article>
          </div>
        </div>
        <h5>{oMessage[0]}</h5>
        <h5>{oMessage[1]}</h5>
        <h4>Nom du Niveau</h4>
        <input
          type="text"
          placeholder="choisissez un nom"
          value={lvlName}
          onChange={(event) => {
            setLvlName(event.target.value);
          }}
        />
      </section>
    </main>
  );
};

export default EditorPage;
