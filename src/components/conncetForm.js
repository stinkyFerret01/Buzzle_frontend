///-- START --///
const ConnectForm = ({ displayConnectForm, setDisplayConnectForm }) => {
  return (
    <section className="spreadOver">
      <div className="connectForm">connectForm</div>
      <button
        className="connectAbort"
        onClick={() => setDisplayConnectForm(false)}
      >
        <h3>ANNULER</h3>
      </button>
    </section>
  );
};

export default ConnectForm;
