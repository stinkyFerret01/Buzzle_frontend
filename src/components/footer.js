///-- CONFIG --///
//-- import librairie

///-- START --///
const Footer = () => {
  ///-- RENDER --///
  return (
    <footer>
      <div className="audio">
        {/* <iframe
            src="../Audio/Stranger-things-124008.mp3"
            allow="autoplay"
            id="audio"
            hidden
          ></iframe> */}
      </div>
      <audio
        className="audioPlayer"
        src="../Audio/Stranger-things-124008.mp3"
        type="audio/mp3"
        controls
        // muted
        loop
        autoPlay
      />
    </footer>
  );
};

export default Footer;
