import { useEffect, useState } from "react";
import "./App.css";
import { Link as RouterLink } from "react-router-dom";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import axios from "axios";
import PrivateRoute from "./PrivateRoute.jsx";


import Login from "./Login.jsx";
import Register from "./Register.jsx";
import Dashboard from "./Dashboard.jsx"

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Login />} />
          <Route element={<PrivateRoute />}>
            <Route path="/dashboard" element = {<Dashboard />} />
            
          </Route>
          
        </Routes>
      </Router>
    </>
  );
}

export default App;
