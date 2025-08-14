import React from "react";
import styles from "./EmployeesTableStyles.module.scss";

const EmployeesTable = ({ employees }) => {
  return (
    <div className={styles.tableContainer}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>DNI</th>
            <th>Check-in</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((emp) => (
            <tr key={emp._id}>
              <td>{emp.name}</td>
              <td>{emp.surname}</td>
              <td>{emp.dni}</td>
              <td>
                {emp.last_entry
                  ? new Date(emp.last_entry).toLocaleString()
                  : "No hay registro"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeesTable;
