///-- CONFIG --///
//-- import style et librairie
import "./App.css";
// import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

//-- import des composants
import HomePage from "./components/homePage";

///-- START --///
function App() {
  ///-- RENDER --///
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
    </Router>
  );
}

export default App;
