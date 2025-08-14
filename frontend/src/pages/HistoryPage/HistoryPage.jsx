import React, { useState, useEffect } from "react";
import apiService from "../../services/apiService";
import styles from "./HistoryPageStyles.module.scss";
const RegisterFormPage = () => {
  const [employees, setEmployees] = useState([]);
  const [employeesHistory, setEmployeesHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const data = await apiService.getEmployees();
        setEmployees(data);
      } catch (err) {
        setError(err);
      }
    };
    fetchEmployees();
  }, []);

  useEffect(() => {
    const fetchAllHistories = async () => {
      setLoading(true);
      try {
        const histories = await Promise.all(
          employees.map((employee) => apiService.getHistoryById(employee._id))
        );
        console.log(histories);

        setEmployeesHistory(histories);
      } catch (err) {
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
    return <div style={{ display: "flex", height: "80vh", width: "100%" }}>
        <img src="circle.png" style={{ margin: "auto" }} alt="" />
      </div>;
  }
  if (error) {
    return <p>Error al cargar la lista de empleados.</p>;
  }
  return (
    <>
      <div className={styles.container}>
        <h1 className={styles.title}>Historial de Ingresos y Egresos</h1>
        {/* Filtra y luego mapea solo los empleados con registros */}
        {employeesHistory.filter((emp) => emp.logs && emp.logs.length > 0)
          .length > 0 ? (
          <div className={styles.historyList}>
            {employeesHistory
              .filter((emp) => emp.logs && emp.logs.length > 0)
              .map((employeeRecord, index) => (
                <div key={index} className={styles.employeeCard}>
                  <h2 className={styles.employeeName}>
                    {employeeRecord.employee_name}
                  </h2>
                  <table className={styles.table}>
                    <thead>
                      <tr>
                        <th>Entrada</th>
                        <th>Salida</th>
                        <th>Duracion</th>
                      </tr>
                    </thead>
                    <tbody>
                      {employeeRecord.logs.map((log, logIndex) => (
                        <tr key={logIndex}>
                          <td>{new Date(log.entry).toLocaleString()}</td>
                          <td>
                            {log.exit
                              ? new Date(log.exit).toLocaleString()
                              : "En curso"}
                          </td>
                          <td>{log.shift_total_time}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ))}
          </div>
        ) : (
          <p className={styles.noRecords}>No hay registros en el historial.</p>
        )}
      </div>
    </>
  );
};

export default RegisterFormPage;
