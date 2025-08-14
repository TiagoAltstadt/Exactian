import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import EmployeesTable from "../components/EmployeesTable";
import apiService from "../services/apiService";

const EmployeesWorkingPage = () => {
  const [employeesWithin, setEmployeesWithin] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEmployeesWithin = async () => {
      try {
        const data = await apiService.getWorkingEmployees();
        setEmployeesWithin(data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    fetchEmployeesWithin();
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
        <h1>Empleados Dentro de la Compañía</h1>
        {employeesWithin.length > 0 ? (
          <EmployeesTable employees={employeesWithin} />
        ) : (
          <p>No hay empleados dentro en este momento.</p>
        )}
      </div>
    </div>
  );
};

export default EmployeesWorkingPage;
