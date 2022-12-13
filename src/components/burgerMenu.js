///-- START --///
const BurgerMenu = ({ game, displayLevels, setDisplayLevels }) => {
  //-- FONCTIONS
  //-- displayLevelsToggler
  const displayLevelsToggler = () => {
    if (displayLevels === true) {
      setDisplayLevels(false);
    } else {
      setDisplayLevels(true);
    }
  };

  ///-- RENDER --///
  return (
    <section>
      <button
        className={game[0] === "Playing..." ? "burgerMenu2" : "burgerMenu"}
        onClick={() => {
          displayLevelsToggler();
        }}
      >
        +
      </button>
    </section>
  );
};

export default BurgerMenu;
