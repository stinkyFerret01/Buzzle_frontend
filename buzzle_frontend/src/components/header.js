///-- CONFIG --///
//-- import librairie
import { useNavigate } from "react-router-dom";

///-- START --///
const Header = ({ level, setLevel }) => {
  const navigate = useNavigate();

  ////////////////////////////////
  // lvl1 et lvl2 sont provisoires
  const lvl1 = [
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
  const lvl2 = [
    "....................",
    "WWWWWWWWWWWWWWWWWWWW",
    "W.B............W...W",
    "W..............W.3.W",
    "W........1.....W...W",
    "W.....Pa.......WWLWW",
    "W......p...........W",
    "WWWWW..........WWKWW",
    "W...W..........W...W",
    "W.B.m.....2....W.B.E",
    "W...W..........W...W",
    "WWWWWWWWWWWWWWWWWWWW",
    "....................",
  ];
  ////////////////////////////////
  ////////////////////////////////

  ///-- RENDER --///
  return (
    <header>
      <section className="headerSection">
        <button onClick={() => {}}>connect</button>
      </section>
      <section className="headerSection">
        <button onClick={() => setLevel(lvl1)}>level1</button>
        <button onClick={() => setLevel(lvl2)}>level2</button>
      </section>
      <section className="headerSection">
        <button onClick={() => navigate("/editor")}>connect</button>
      </section>
    </header>
  );
};

export default Header;
