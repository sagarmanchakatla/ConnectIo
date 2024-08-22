import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Sidebar from "./Component/Sidebar";
import Navbar from "./Component/Navbar"; // Import Navbar component
import Home from "./pages/Home";
import Schedule from "./pages/Schedule";
import Saved from "./pages/Saved";
import "./App.css";
import Room from "./pages/Room";
import Meeting from "./pages/Meeting";

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <div className="main-content">
          <Sidebar />
          <div className="content">
            <Routes>
              <Route path="/home" element={<Home />} />
              <Route path="/meet" element={<Meeting />} />
              <Route path="/room" element={<Room />} />
              <Route path="/schedule" element={<Schedule />} />
              <Route path="/saved" element={<Saved />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
