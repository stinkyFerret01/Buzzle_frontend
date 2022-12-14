///-- START --///
const WaitForResponse = ({ displayWfr, setDisplayWfr }) => {
  let text = {
    title: `${displayWfr[1]}`,
    message: `${displayWfr[2]}`,
    button: `${displayWfr[3]}`,
  };
  const waitNews = {
    backgroundColor: "gold",
  };
  const goodNews = {
    backgroundColor: "green",
  };
  const badNews = {
    backgroundColor: "red",
  };
  let style = {};
  if (displayWfr[0] === "edit request") {
    style = waitNews;
  } else if (displayWfr[0] === "edit ok" || displayWfr[0] === "levels ok") {
    style = goodNews;
  } else if (displayWfr[0] === "edit error") {
    style = badNews;
  }

  ///-- RENDER --///
  return (
    <section className="spreadOver">
      <article className="ays" style={style}>
        <h3 className="noHovText">{text.title}</h3>
        <h5 className="noHovText">{text.message}</h5>
        <button className="wfrContinue" onClick={() => setDisplayWfr("none")}>
          {text.button}
        </button>
      </article>
    </section>
  );
};

export default WaitForResponse;
