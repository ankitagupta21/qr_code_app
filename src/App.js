import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Login from "./components/Login";
import ManageQR from "./components/ManageQR";
import AudioCall from "./components/AudioCall";

const App = () => {
  return (
    <section className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<ManageQR />} />
          <Route path="/call" element={<AudioCall />} />
        </Routes>
      </Router>
    </section>
  );
};

export default App;
