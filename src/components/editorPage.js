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
  setLevelTitle,
  setLevelContext,
  levels,
  edited,
  setEdited,
  editBase,
  setEditBase,
  setLevels,
  setDisplayAys,
  bigScreen,
  setBigScreen,
}) => {
  ///-- STATES --///
  const [ligns, setLigns] = useState(10);
  const [colons, setColons] = useState(10);
  const [oSelection, setOSelection] = useState("W");
  const [oMessage, setOMessage] = useState(["MUR"]);
  const [base, setBase] = useState("loading");
  const [lvlName, setLvlName] = useState("");
  const [lvlContext, setLvlContext] = useState("");
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

  const editQuiter = () => {
    navigate("/game/game");
  };

  const editer = async () => {
    let context = "AUCUNE INFORMATION";
    if (edited[2] !== "") {
      context = edited[2];
    }
    if (edited[0] !== "none" && edited[1] !== "") {
      if (levels.findIndex((lvl) => lvl.name === edited[1])) {
        try {
          setDisplayWfr([
            "edit request",
            "PATIENTEZ",
            "NOUS éDITONS VOTRE NIVEAU, L'OPéRATION PEUT PREDRE QUELQUES SECONDES. CONTINUER SANS ATTENDRE PEUT VOUS FAIRE PERDRE VOTRE PROGRESSION!",
            "JE PRENDS LE RISQUE!",
          ]);
          const response = await axios.post(`${backend}/edit`, {
            pattern: edited[0],
            name: edited[1],
            context: context,
          });
          if (response.data.message === "votre niveau a été édité!") {
            setDisplayWfr([
              "edit ok",
              "TOUT EST OK!",
              "VOTRE NIVEAU A éTé éDITé, VOUS POUVEZ LE RETROUVER DANS LA CATéGORIE -A VéRIFIER-",
              "CONTINUER",
            ]);
            setLevels((prevState) => [...prevState, response.data.level]);
          } else if (response.data.message === "ce nom est déja utilisé!") {
            setDisplayWfr([
              "edit error",
              "OUPS!",
              "UN NIVEAU PORTE DéJA CE NOM, CHOISISSEZ UN AUTRE NOM POUR POUVOIR éDITER",
              "RETOURNER A L'éDITION",
            ]);
          }
        } catch (error) {}
      }
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
      ["Bs", "BOITE", "PEUT SE SUPERPOSER AUX CLéS ET A LA PLAQUE DE PRESSION"],
      ["C", "AGENT ENNEMI"],
      ["Dv", "PORTE VERTICALE"],
      ["Dh", "PORTE HORIZONTALE"],
      ["E", "SORTIE"],
      ["Kv", "PORTE VéRROUILLé 1"],
      ["Kh", "PORTE VéRROUILLé 1"],
      ["kg", "CLéS PV 1", "PEUT SE CACHER SOUS LES BOITES"],
      ["Lv", "PORTE VéRROUILLé 2"],
      ["Lh", "PORTE VéRROUILLé 2"],
      ["lg", "CLéS PV 2", "PEUT SE CACHER SOUS LES BOITES"],
      ["Mv", "PORTE VéRROUILLé 3"],
      ["Mh", "PORTE VéRROUILLé 3"],
      ["mg", "CLéS PV 3", "PEUT SE CACHER SOUS LES BOITES"],
      ["pg", "PLAQUE DE PRESSION", "PEUT SE CACHER SOUS LES BOITES"],
      ["P", "SPAWN DU JOUEUR", "1 SEUL "],
      ["W", "MUR"],
      [".", "EFFACER"],
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
    let name = lvlName;
    if (lvlName.length < 3) {
      name = "NOM DU NIVEAU";
    }
    let context = lvlContext;
    if (lvlContext === "") {
      context = "AUCUNE INFORMATION";
    }
    if (editable !== "not ready") {
      setLevel(edited[0]);
      setLevelTitle(name);
      setLevelContext(context);
      setEditBase([base, name, context]);
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
      setLvlContext(editBase[2]);
    }
  }, [ligns, colons, editBase]);

  //-- patternBuilder (construit le pattern pour l'édition)
  useEffect(() => {
    if (lvlContext === "AUCUNE INFORMATION") {
      setLvlContext("");
    }
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
          setEdited([pattern, lvlName, lvlContext]);
          setEditable("good for testing");
          if (lvlName.length > 2) {
            setEditable("ready to be edited");
          }
        } else {
          setEdited(["none", "NOM", "aucune information"]);
          setEditable("not ready");
        }
      }
    };
    base !== "loading" && patternBuilder(base);
  }, [base, setEdited, lvlName, lvlContext]);

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
            <h2 className="reduceScreenX">x</h2>
          </button>
        ) : (
          <button className="enlargeScreen" onClick={screenToggler}>
            <h3>O</h3>
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
                              lvlContext={lvlContext}
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
        <button
          className="editToGameButton"
          onClick={() => {
            editQuiter("game/game");
          }}
        >
          <h2>P</h2>
        </button>
        <h4 className="noHovText">éLéMENTS:</h4>
        <div className="shopLists">
          <div className="shopList">
            <h5 className="noHovText">NéCESSAIRES</h5>
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
            <h5 className="noHovText">BASIQUES</h5>
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
            <h5 className="noHovText">OPTIONELS</h5>
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
          <h5 className="noHovText">{oMessage[0]}</h5>
          <h5 className="noHovText">{oMessage[1]}</h5>
        </div>
        <div className="levelNameSelect">
          <h4 className="noHovText">NOM DU NIVEAU</h4>
          <input
            className="levelNameInput"
            type="text"
            placeholder="choisissez un nom"
            value={lvlName}
            onChange={(event) => {
              let name = event.target.value;
              if (name.length < 14) {
                setLvlName(event.target.value);
              }
            }}
          />
          <h5 className="noHovText">ENTRE 3 ET 13 CARACTèRES</h5>
        </div>
        <div className="levelContextSelect">
          <h4 className="noHovText">DESCRIPTION DU NIVEAU</h4>
          <textarea
            className="levelContextInput"
            type="text"
            placeholder="ajoutez une description (optionel)"
            value={lvlContext}
            onChange={(event) => {
              let context = event.target.value;
              if (context.length < 101) {
                setLvlContext(event.target.value);
              }
            }}
          />
          <h5 className="noHovText">JUSQU'A 100 CARACTèRES!</h5>
        </div>
        <div className="testerContainer">
          {editable !== "not ready" && (
            <div className="levelTester">
              <button className="levelTesterButton" onClick={levelTester}>
                <h3>TESTER!</h3>
              </button>
              {editable === "ready to be edited" && (
                <button className="levelEditerButton" onClick={() => editer()}>
                  <h3>EDITER!</h3>
                </button>
              )}
            </div>
          )}
        </div>
        <button
          className="backToGameButton"
          onClick={() => {
            editQuiter();
          }}
        >
          <h3 className="noHovText">RETOURNER JOUER!</h3>
        </button>
      </section>
    </main>
  );
};

export default EditorPage;
