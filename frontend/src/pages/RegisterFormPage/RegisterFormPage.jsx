import React, { useState } from "react";
import apiService from "../../services/apiService";
import styles from "./RegisterFormPageStyles.module.scss";

const RegisterFormPage = ({ employees }) => {
  const [formData, setFormData] = useState({
    employee_ID: "",
    tipo: "ingreso",
    fecha: new Date().toISOString().slice(0, 16),
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setMessage("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (formData.tipo === "ingreso") {
        const response = await apiService.registrarIngreso(
          formData.employee_ID,
          formData.fecha
        );
        setMessage(response.msg);
      } else {
        const response = await apiService.registrarEgreso(
          formData.employee_ID,
          formData.fecha
        );
        setMessage(response.msg);
      }
    } catch (error) {
      setMessage(error.response.data.msg);
    }
  };

  return (
    <div className={styles.formContainer}>
      <h2 className={styles.title}>Registro de Ingresos y Egresos</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.inputGroup}>
          <label htmlFor="employee_ID">Empleado:</label>
          <select
            id="employee_ID"
            name="employee_ID"
            value={formData.employee_ID}
            onChange={handleChange}
            required
          >
            <option value="">-- Seleccione un empleado --</option>
            {employees.map((emp) => (
              <option key={emp._id} value={emp._id}>
                {emp.name} {emp.surname}
              </option>
            ))}
          </select>
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="tipo">Tipo de Acción:</label>
          <select
            id="tipo"
            name="tipo"
            value={formData.tipo}
            onChange={handleChange}
          >
            <option value="ingreso">Ingreso</option>
            <option value="egreso">Egreso</option>
          </select>
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="fecha">Fecha y Hora:</label>
          <input
            id="fecha"
            type="datetime-local"
            name="fecha"
            value={formData.fecha}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className={styles.submitButton}>
          Registrar
        </button>
        {message && <p className={styles.message}>{message}</p>}
      </form>
    </div>
  );
};

export default RegisterFormPage;
