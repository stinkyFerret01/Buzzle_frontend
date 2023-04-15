///-- CONFIG --///
//-- import librairie

// import music from url("../Audio/Stranger-things-124008.mp3")

///-- START --///
const Footer = () => {
  ///-- RENDER --///
  return (
    <footer>
      <div className="audioContainer">
        {/* <iframe
            src="../Audio/Stranger-things-124008.mp3"
            allow="autoplay"
            id="audio"
            hidden
          ></iframe> */}
      </div>
      {/* <audio
        width="10000"
        className="audioPlayer"
        src="../Audio/Stranger-things-124008.mp3"
        type="audio/mp3"
        controls
        // muted
        loop
        autoPlay
      /> */}
    </footer>
  );
};

export default Footer;
