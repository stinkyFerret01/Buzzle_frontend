///-- CONFIG --///
//-- import style et librairie
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";

//-- import des composants
import Header from "./components/header";
import HomePage from "./components/homePage";
import GamePage from "./components/gamePage";
import EditorPage from "./components/editorPage";
import Footer from "./components/footer";

///-- START --///
function App() {
  ///-- STATES --///
  const [level, setLevel] = useState("none");

  ///-- RENDER --///
  return (
    <div className="App">
      <Router>
        <Header level={level} setLevel={setLevel} />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/game" element={<GamePage level={level} />} />
          <Route path="/editor" element={<EditorPage />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
