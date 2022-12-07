///-- CONFIG --///
//-- import style et librairie
import "./App.css";
// import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

//-- import des composants
import Header from "./components/header";
import HomePage from "./components/homePage";
import GamePage from "./components/gamePage";
import { useState } from "react";

///-- START --///
function App() {
  //-- STATES
  const [level, setLevel] = useState("none");
  ///-- RENDER --///
  return (
    <div className="App">
      <Router>
        <Header level={level} setLevel={setLevel} />
        <Routes>
          <Route path="/" element={<HomePage level={level} />} />
          <Route path="/game" element={<GamePage level={level} />} />
        </Routes>
        <footer></footer>
      </Router>
    </div>
  );
}

export default App;
