// src/pages/RegisterPage.jsx
import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import RegisterFormPage from "../pages/RegisterFormPage";
import apiService from "../services/apiService";

const RegisterPage = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const data = await apiService.getEmpleados();
        setEmployees(data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    fetchEmployees();
  }, []);

  if (loading) {
    return <p>Cargando empleados...</p>;
  }

  if (error) {
    return <p>Error al cargar la lista de empleados.</p>;
  }

  return (
    <div>
      <Header />
      <div style={{ padding: "20px" }}>
        <h1>Registro de Ingresos y Egresos</h1>
        <RegisterFormPage employees={employees} />
      </div>
    </div>
  );
};

export default RegisterPage;
