const Header = ({ level, setLevel }) => {
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

  return (
    <header>
      <button onClick={() => setLevel(lvl1)}>level</button>
    </header>
  );
};
export default Header;
