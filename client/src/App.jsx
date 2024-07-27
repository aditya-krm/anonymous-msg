import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Chat from "./components/Chat/Chat";
import Home from "./components/Home/Home";

import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/chat/:roomId" element={<Chat />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
