import React, { useState, useEffect } from "react";
import apiService from "../../services/apiService";
import styles from "./HistoryPageStyles.module.scss";
import Header from "../../components/Header";

const RegisterFormPage = () => {
  const [employees, setEmployees] = useState([]);
  const [employeesHistory, setEmployeesHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch employees on mount
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const data = await apiService.getEmpleados();
        setEmployees(data);
      } catch (err) {
        setError(err);
      }
    };
    fetchEmployees();
  }, []);

  // Fetch history when employees are loaded
  useEffect(() => {
    const fetchAllHistories = async () => {
      setLoading(true);
      try {
        const histories = await Promise.all(
          employees.map((employee) => apiService.getHistoryById(employee._id))
        );
        // Flatten and add employee name to each record
        const allRecords = histories.flat().map((record, idx) => ({
          ...record,
          name: employees[idx]?.name || record.name,
        }));
        console.log(allRecords);

        setEmployeesHistory(allRecords);
      } catch (err) {
        console.log(err);

        setError(err);
      } finally {
        setLoading(false);
      }
    };
    if (employees.length > 0) {
      fetchAllHistories();
    } else {
      setLoading(false);
    }
  }, [employees]);

  if (loading) {
    return <p>Cargando empleados...</p>;
  }
  if (error) {
    return <p>Error al cargar la lista de empleados.</p>;
  }
  return (
    <>
      <Header />
      <div className={styles.container}>
        <h1 className={styles.title}>Historial de Ingresos y Egresos</h1>
        {employeesHistory.length > 0 ? (
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Fecha y Hora</th>
                <th>Tipo</th>
              </tr>
            </thead>
            <tbody>
              {employeesHistory.map((record, index) => (
                <tr key={index}>
                  <td>{record.nombre}</td>
                  <td>{new Date(record.timestamp).toLocaleString()}</td>
                  <td>{record.tipo}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No hay registros en el historial.</p>
        )}
      </div>
    </>
  );
};

export default RegisterFormPage;
