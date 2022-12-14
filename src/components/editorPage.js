///-- CONFIG --///
//-- import librairie
import { useState, useEffect } from "react";
import * as React from "react";
import { Range } from "react-range";
import { useNavigate } from "react-router-dom";
import axios from "axios";

//-- import des composants
import Pos from "./pos";

///-- START --///
const EditorPage = ({
  backend,
  setDisplayWfr,
  setLevel,
  edited,
  setEdited,
  editBase,
  setEditBase,
  setDisplayAys,
  bigScreen,
  setBigScreen,
}) => {
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
    necessary: ["P", "E", "pg", "Bs"],
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
  //-- screenToggler
  const screenToggler = () => {
    if (bigScreen === true) {
      setBigScreen(false);
    } else {
      setBigScreen(true);
    }
  };

  const editer = async () => {
    if (edited[0] !== "none" && edited[1] !== "") {
      try {
        setDisplayWfr(true);
        const response = await axios.post(`${backend}/edit`, {
          pattern: edited[0],
          name: edited[1],
          status: edited[2],
        });
        if (response.data.message === "votre niveau a été édité!") {
          setDisplayWfr(false);
        }
      } catch (error) {}
    }
  };

  //-- choice updater gère le choix et laffichage de l'élement choisi
  const choiceUpdater = (o, oDef) => {
    if (oDef === true) {
      setOSelection(o);
    }
    let pairs = [
      [
        "a",
        "activité du joueur",
        "1 seul possible, au contact direct du joueur",
      ],
      ["Bs", "boite", "peut se superposer sur certains objets"],
      ["C", "agent ennemi"],
      ["Dv", "porte verticale"],
      ["Dh", "porte horizontale"],
      ["E", "sortie", "1 seul possible"],
      ["Kv", "porte vérouillée 1 verticale"],
      ["Kh", "porte vérouillée 1 horizontale"],
      ["kg", "clés PV 1", "autorise la superposition de certains objets"],
      ["Lv", "porte vérouillée 2 verticale"],
      ["Lh", "porte vérouillée 2 horizontale"],
      ["lg", "clés PV 2", "autorise la superposition de certains objets"],
      ["Mv", "porte vérouillée 3 verticale"],
      ["Mh", "porte vérouillée 3 horizontale"],
      ["mg", "clés PV 3", "autorise la superposition de certains objets"],
      [
        "pg",
        "plaque de pression",
        "autorise la superposition de certains objets",
      ],
      ["P", "spawn du joueur", "1 seul possible"],
      ["W", "mur"],
      [".", "effacer"],
    ];
    let oIndex = pairs.findIndex((pair) => pair[0] === o);
    let message = pairs[oIndex][1];
    let message2 = pairs[oIndex][2];
    if (oDef === false) {
      let oIndex = pairs.findIndex((pair) => pair[0] === oSelection);
      message = pairs[oIndex][1];
      message2 = pairs[oIndex][2];
    }
    setOMessage([message, message2]);
  };

  //- tryLevel
  const levelTester = () => {
    if (editable !== "not ready") {
      setLevel(edited[0]);
      setEditBase([base, lvlName]);
      navigate("/game/editor");
    }
  };

  ///-- USEEFFECT --///
  useEffect(() => {
    if (editBase !== "none") {
      setLigns(editBase[0].length - 2);
      setColons(editBase[0][0].length);
    }
  }, [editBase]);

  //-- baseBuilder (construit la base)
  useEffect(() => {
    //-- baseBuilder construit le tableau du niveau choisi
    const baseBuilder = (li, co) => {
      let base = [];
      for (let L = 0; L < li + 2; L++) {
        let lign = [];
        for (let o = 0; o < co; o++) {
          let toEdit = "";
          if (editBase[0] !== "none" && editBase[0][L] && editBase[0][L][o]) {
            toEdit = editBase[0][L][o];
          }
          if (L === 0 || L === li + 1) {
            lign.push(".");
          } else if (
            (L === 1 || L === li || o === 0 || o === co - 1) &&
            toEdit !== "E"
          ) {
            lign.push("W");
          } else if (
            (editBase[0] !== "none" &&
              editBase[0][L] !== undefined &&
              editBase[0][L][o] !== undefined &&
              L >= 2 &&
              o > 0 &&
              L < editBase[0].length - 2 &&
              o < editBase[0][0].length - 1) ||
            ((L === 1 ||
              L === editBase[0].length - 2 ||
              o === 0 ||
              o === editBase[0][0].length - 1) &&
              toEdit === "E")
          ) {
            lign.push(editBase[0][L][o]);
          } else {
            lign.push(".");
          }
        }
        base.push(lign);
      }
      return base;
    };
    let newBase = baseBuilder(parseInt(ligns), parseInt(colons));
    setBase(newBase);
    if (editBase !== "none") {
      setLvlName(editBase[1]);
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
    <main
      className="editorPage"
      style={
        bigScreen
          ? { height: "100vh", width: "100vw", maxWidth: "100vw" }
          : { width: "90%", maxWidth: "42.7rem" }
      }
    >
      <section
        className="editView"
        style={
          bigScreen
            ? {
                height: "100vh",
                width: "100vw",
                maxWidth: "calc(100vw - 13rem)",
              }
            : { width: "100%", maxWidth: "calc(100% - 13rem" }
        }
      >
        {bigScreen === true ? (
          <button className="reduceScreen" onClick={screenToggler}>
            X
          </button>
        ) : (
          <button className="enlargeScreen" onClick={screenToggler}>
            O
          </button>
        )}
        <div className="editViewScroller">
          <div
            className="editViewTop"
            style={bigScreen ? { maxWidth: "none" } : { maxWidth: "26.7rem" }}
          >
            <div
              className={
                bigScreen ? "editBlankHorizontalBig" : "editBlankHorizontal"
              }
            ></div>
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
                  className={
                    bigScreen
                      ? "rangeTrackHorizontalBig"
                      : "rangeTrackHorizontal"
                  }
                  style={{
                    ...props.style,
                  }}
                >
                  {children}
                </div>
              )}
              renderThumb={({ props }) => (
                <div
                  {...props}
                  className="rangeButton"
                  style={{
                    ...props.style,
                    height: "2rem",
                    width: "2rem",
                    fontWeight: "bold",
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
              <div
                className={
                  bigScreen ? "editBlankVerticalBig" : "editBlankVertical"
                }
              ></div>
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
                    className={
                      bigScreen ? "rangeTrackVerticalBig" : "rangeTrackVertical"
                    }
                    style={{
                      ...props.style,
                    }}
                  >
                    {children}
                  </div>
                )}
                renderThumb={({ props }) => (
                  <div
                    {...props}
                    className="rangeButton"
                    style={{
                      ...props.style,
                      height: "2rem",
                      width: "2rem",
                      fontWeight: "bold",
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
                          <div
                            className="posSpacer2"
                            style={
                              bigScreen ? { width: "2rem", height: "2rem" } : {}
                            }
                            key={indexo}
                          >
                            <Pos
                              o={o}
                              type="edit"
                              oSelection={oSelection}
                              setOSelection={setOSelection}
                              base={base}
                              setBase={setBase}
                              setEditBase={setEditBase}
                              lvlName={lvlName}
                              bigScreen={bigScreen}
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
        </div>
      </section>
      <section
        className="editShop"
        style={bigScreen ? { height: "100vh", maxWidth: "100%" } : {}}
      >
        <h4 className="noHovText">éléments:</h4>
        <div className="shopLists">
          <div className="shopList">
            <h5 className="noHovText">nécessaires</h5>
            <article className="shopCategory">
              {os.necessary.map((o, indexo) => {
                return (
                  <div
                    className="posSpacer"
                    onClick={() => choiceUpdater(o, true)}
                    onMouseEnter={() => {
                      choiceUpdater(o, "none");
                    }}
                    onMouseLeave={() => {
                      choiceUpdater(o, false);
                    }}
                    key={indexo}
                  >
                    <Pos
                      o={o}
                      setOSelection={setOSelection}
                      setOMessage={setOMessage}
                      bigScreen={bigScreen}
                      type="choose"
                    />
                  </div>
                );
              })}
            </article>
            <h5 className="noHovText">basiques</h5>
            <article className="shopCategory">
              {os.basics.map((o, indexo) => {
                return (
                  <div
                    className="posSpacer"
                    onClick={() => choiceUpdater(o, true)}
                    onMouseEnter={() => {
                      choiceUpdater(o, "none");
                    }}
                    onMouseLeave={() => {
                      choiceUpdater(o, false);
                    }}
                    key={indexo}
                  >
                    <Pos
                      o={o}
                      setOSelection={setOSelection}
                      setOMessage={setOMessage}
                      bigScreen={bigScreen}
                      type="choose"
                    />
                  </div>
                );
              })}
            </article>
          </div>
          <div className="shopList">
            <h5 className="noHovText">optionels</h5>
            <article className="shopCategory">
              {os.objects.map((o, indexo) => {
                return (
                  <div
                    className="posSpacer"
                    onClick={() => choiceUpdater(o, true)}
                    onMouseEnter={() => {
                      choiceUpdater(o, "none");
                    }}
                    onMouseLeave={() => {
                      choiceUpdater(o, false);
                    }}
                    key={indexo}
                  >
                    <Pos
                      o={o}
                      setOSelection={setOSelection}
                      setOMessage={setOMessage}
                      bigScreen={bigScreen}
                      type="choose"
                    />
                  </div>
                );
              })}
            </article>
            <article className="shopCategory">
              {os.others.map((o, indexo) => {
                return (
                  <div
                    className="posSpacer"
                    onClick={() => choiceUpdater(o, true)}
                    onMouseEnter={() => {
                      choiceUpdater(o, "none");
                    }}
                    onMouseLeave={() => {
                      choiceUpdater(o, false);
                    }}
                    key={indexo}
                  >
                    <Pos
                      o={o}
                      setOSelection={setOSelection}
                      setOMessage={setOMessage}
                      bigScreen={bigScreen}
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
          <h4 className="noHovText">Nom du Niveau</h4>
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
          <p
            className="noHovText"
            style={{ fontSize: "11px", lineHeight: "1px" }}
          >
            entre 3 et 11 caractères
          </p>
        </div>
        {editable !== "not ready" && (
          <div className="levelTester">
            <button className="levelTesterButton" onClick={levelTester}>
              TESTER!
            </button>
            {editable === "ready to be edited" && (
              <button className="levelEditerButton" onClick={() => editer()}>
                EDITER!
              </button>
            )}
          </div>
        )}
        <button
          className="backToGameButton"
          onClick={() => {
            setDisplayAys("game/game");
          }}
        >
          RETOURNER JOUER!
        </button>
      </section>
    </main>
  );
};

export default EditorPage;
