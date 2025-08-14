import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import EmployeesWorkingPage from "./pages/EmployeesWorkingPage/EmployeesWorkingPage";
import HistoryPage from "./pages/HistoryPage/HistoryPage";
import Header from "./components/Header/Header";

import "./App.css";

function App() {
  return (
    <>
      <Router>
      <Header />
        <Routes>
          <Route path="/" element={<RegisterPage />} />
          <Route path="/logged-in" element={<EmployeesWorkingPage />} />
          <Route path="/history" element={<HistoryPage />} />
        </Routes>
        <div className="disclaimer">Programado por <a href="www.tiagoaltstadt.com">Tiago Altstadt</a></div>
      </Router>
    </>
  );
}

export default App;
