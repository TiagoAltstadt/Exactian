import React from "react";

const EmployeesTable = ({ employees }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Apellido</th>
          <th>DNI</th>
        </tr>
      </thead>
      <tbody>
        {employees.map((emp) => (
          <tr key={emp._id}>
            <td>{emp.nombre}</td>
            <td>{emp.apellido}</td>
            <td>{emp.dni}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default EmployeesTable;
