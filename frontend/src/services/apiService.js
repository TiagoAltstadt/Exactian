import axios from "axios";

const API_URL = "/api";

const apiService = {
  getEmpleados: async () => {
    try {
      const response = await axios.get(`${API_URL}/empleados`);
      return response.data;
    } catch (error) {
      console.error("Error fetching employees:", error);
      throw error;
    }
  },

  getEmpleadosDentro: async () => {
    try {
      const response = await axios.get(`${API_URL}/empleados/dentro`);
      return response.data;
    } catch (error) {
      console.error("Error fetching employees within:", error);
      throw error;
    }
  },
  getHistoryById: async (id) => {
    try {
      const response = await axios.get(`${API_URL}/registros/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching employees within:", error);
      throw error;
    }
  },

  registrarIngreso: async (empleadoId, fecha) => {
    try {
      const response = await axios.post(`${API_URL}/registros`, {
        employee_ID: empleadoId,
        entry: fecha,
      });
      return response.data;
    } catch (error) {
      console.error("Error registering entry:", error);
      throw error;
    }
  },

  registrarEgreso: async (empleadoId, fecha) => {
    try {
      const response = await axios.patch(`${API_URL}/registros/${empleadoId}`, {
        exit: fecha,
      });
      return response.data;
    } catch (error) {
      console.error("Error registering exit:", error);
      throw error;
    }
  },
};

export default apiService;
