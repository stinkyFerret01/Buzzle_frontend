///-- START --///
const WaitForResponse = ({ type, setDisplayWfr }) => {
  let text = {
    title: `${type[0]}`,
    message: `${type[1]}`,
    button: `${type[2]}`,
  };
  const waitNews = {
    backGroundColor: "gold",
  };
  const goodNews = {
    backGroundColor: "green",
  };
  const badNews = {
    backGroundColor: "red",
  };
  let style = {};
  if (type === "edit request") {
    style = waitNews;
  } else if (type === "edit ok") {
    style = goodNews;
  } else if (type === "edit error") {
    style = badNews;
  }

  ///-- RENDER --///
  return (
    <section className="spreadOver">
      <article className="ays" style={style}>
        <h3>{text.title}</h3>
        <h5>
          {text.message}
          {/* continuer sans attendre peut vous faire perdre votre progression */}
        </h5>
        <button className="wfrContinue" onClick={() => setDisplayWfr(false)}>
          {text.button}
        </button>
      </article>
    </section>
  );
};

export default WaitForResponse;
