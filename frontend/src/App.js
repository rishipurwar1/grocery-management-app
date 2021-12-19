import React from "react";
import "./App.css";
import "./assets/output.css";
import { Routes, Route } from "react-router-dom";

import Home from "./components/home/Home";
import Dashboard from "./components/product/Dashboard";
import Navbar from "./components/layouts/Navbar";
import CreateOrder from "./components/home/CreateOrder";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="products" element={<Dashboard />} />
        <Route path="create" element={<CreateOrder />} />
      </Routes>
    </div>
  );
}

export default App;
