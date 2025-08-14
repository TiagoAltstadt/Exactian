import React, { useState, useEffect } from "react";
import apiService from "../../services/apiService";
import styles from "./HistoryPageStyles.module.scss";

const formatTime = (hours) => {
  if (hours < 0) return "N/A";

  const wholeHours = Math.floor(hours);
  const minutes = Math.round((hours - wholeHours) * 60);

  if (minutes === 60) {
    return `${wholeHours + 1}h`;
  }

  const hoursText = wholeHours > 0 ? `${wholeHours}h ` : "";
  const minutesText = minutes > 0 ? `${minutes}m` : "";

  if (hoursText === "" && minutesText === "") {
    return "Menos de 1m";
  }

  return `${hoursText}${minutesText}`.trim();
};

const HistoryPage = () => {
  const [employees, setEmployees] = useState([]);
  const [employeesHistory, setEmployeesHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

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

  const filteredEmployees = employeesHistory
    .filter((emp) => emp.logs && emp.logs.length > 0)
    .filter((emp) =>
      emp.employee_name.toLowerCase().includes(searchTerm.toLowerCase())
    );

  if (loading) {
    return (
      <div style={{ display: "flex", height: "80vh", width: "100%" }}>
        <img src="circle.png" style={{ margin: "auto" }} alt="" />
      </div>
    );
  }
  if (error) {
    return <p>Error al cargar la lista de empleados.</p>;
  }

  return (
    <>
      <div className={styles.container}>
        <h1 className={styles.title}>Historial de Ingresos y Egresos</h1>

        <input
          type="text"
          placeholder="Buscar por nombre..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={styles.searchInput}
        />

        {filteredEmployees.length > 0 ? (
          <div className={styles.historyList}>
            {filteredEmployees.map((employeeRecord, index) => (
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
                        <td>{formatTime(log.shift_total_time)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ))}
          </div>
        ) : (
          <p className={styles.noRecords}>
            {searchTerm
              ? "No se encontraron registros que coincidan con la búsqueda."
              : "No hay registros en el historial."}
          </p>
        )}
      </div>
    </>
  );
};

export default HistoryPage;
