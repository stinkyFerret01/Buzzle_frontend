///-- CONFIG --///
//-- import librairie
import { useState, useEffect } from "react";
import * as React from "react";
import { Range } from "react-range";
import { useNavigate } from "react-router-dom";

//-- import des composants
import Pos from "./pos";

///-- START --///
const EditorPage = ({ setLevel, edited, setEdited, editBase, setEditBase }) => {
  ///-- STATES --///
  const [ligns, setLigns] = useState(10);
  const [colons, setColons] = useState(10);
  const [oSelection, setOSelection] = useState("W");
  const [oMessage, setOMessage] = useState(["mur"]);
  const [base, setBase] = useState("loading");
  const [lvlName, setLvlName] = useState("");
  const [lvlStatus] = useState("new");
  const [editable, setEditable] = useState("not ready");

  //-- config
  const navigate = useNavigate();

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
    others: [],
  };

  ///-- FONCTIONS --///
  //- tryLevel
  const levelTester = () => {
    if (editable !== "not ready") {
      setLevel(edited[0]);
      setEditBase(base);
      navigate("/game/editor");
    }
  };

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
    if (editBase === "none") {
      setBase(baseBuilder(parseInt(ligns), parseInt(colons)));
    } else {
      setBase(editBase);
    }
  }, [ligns, colons, editBase]);

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
      let necsToCheck = ["Bs", "E", "pg", "P"];
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
          } else if (newO === "0") {
            let necIndex = necs.findIndex((nec) => nec === "Bs");
            if (necIndex < 0) {
              necs.push("Bs");
            }
            necIndex = necs.findIndex((nec) => nec === "pg");
            if (necIndex < 0) {
              necs.push("pg");
            }
          } else if (newO > 3) {
            let necIndex = necs.findIndex((nec) => nec === "Bs");
            if (necIndex < 0) {
              necs.push("Bs");
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
          setEditable("good for testing");
          if (lvlName !== "none" && lvlName.length > 2) {
            setEditable("ready to be edited");
          }
        } else {
          setEdited(["none", lvlName, lvlStatus]);
          setEditable("not ready");
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
                        <div className="posSpacer2" key={indexo}>
                          <Pos
                            o={o}
                            type="edit"
                            oSelection={oSelection}
                            setOSelection={setOSelection}
                            base={base}
                            setBase={setBase}
                            xy={[indexL, indexo]}
                          />
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
                  <div className="posSpacer" key={indexo}>
                    <Pos
                      o={o}
                      setOSelection={setOSelection}
                      setOMessage={setOMessage}
                      type="choose"
                    />
                  </div>
                );
              })}
            </article>
            <h5>basiques</h5>
            <article className="shopCategory">
              {os.basics.map((o, indexo) => {
                return (
                  <div className="posSpacer" key={indexo}>
                    <Pos
                      o={o}
                      setOSelection={setOSelection}
                      setOMessage={setOMessage}
                      type="choose"
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
                  <div className="posSpacer" key={indexo}>
                    <Pos
                      o={o}
                      setOSelection={setOSelection}
                      setOMessage={setOMessage}
                      type="choose"
                    />
                  </div>
                );
              })}
            </article>
            <article className="shopCategory">
              {os.others.map((o, indexo) => {
                return (
                  <div className="posSpacer" key={indexo}>
                    <Pos
                      o={o}
                      setOSelection={setOSelection}
                      setOMessage={setOMessage}
                      type="choose"
                    />
                  </div>
                );
              })}
            </article>
          </div>
        </div>
        <div className="oMessages">
          <h5 className="oMessage1">{oMessage[0]}</h5>
          <h6 className="oMessage2">{oMessage[1]}</h6>
        </div>
        <div className="levelNameSelect">
          <h4>Nom du Niveau</h4>
          <input
            type="text"
            placeholder="choisissez un nom"
            value={lvlName}
            onChange={(event) => {
              let test = event.target.value;
              if (test.length < 12) {
                setLvlName(event.target.value);
              }
            }}
          />
          <h6>entre 3 et 11 caractères</h6>
        </div>
        <h6>les agents ne sont pas encore activés</h6>
        <button onClick={levelTester}>TRY LVL</button>
      </section>
    </main>
  );
};

export default EditorPage;
