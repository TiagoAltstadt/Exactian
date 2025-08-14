import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RegisterPage from "./pages/RegisterPage";
import EmployeesWorkingPage from "./pages/EmployeesWorkingPage";

import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<RegisterPage />} />
        <Route path="/dentro" element={<EmployeesWorkingPage />} />
      </Routes>
    </Router>
  );
}

export default App;
