///-- START --///
const WaitForResponse = ({ setDisplayWfr }) => {
  ///-- RENDER --///
  return (
    <section className="spreadOver">
      <article className="ays">
        <h3>PATIENTEZ!</h3>
        <h5>
          continuer sans attendre peut vous faire perdre votre progression
        </h5>
        <button className="wfrContinue" onClick={() => setDisplayWfr(false)}>
          CONTINUER
        </button>
      </article>
    </section>
  );
};

export default WaitForResponse;
