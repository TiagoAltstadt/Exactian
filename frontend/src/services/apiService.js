import axios from "axios";

// const API_URL = "/api"; Uncomment this and comment the line below to test on local
const API_URL = "http://192.168.0.104:5000/api";

const apiService = {
  getEmployees: async () => {
    try {
      const response = await axios.get(`${API_URL}/empleados`);
      return response.data;
    } catch (error) {
      console.error("Error fetching employees:", error);
      throw error;
    }
  },

  getWorkingEmployees: async () => {
    try {
      const response = await axios.get(`${API_URL}/empleados/logged-in`);
      return response.data;
    } catch (error) {
      console.error("Error fetching employees within:", error);
      throw error;
    }
  },
  getHistoryById: async (id) => {
    try {
      const response = await axios.get(`${API_URL}/logs/history/${id}`);

      return response.data;
    } catch (error) {
      console.error("Error fetching employees within:", error);
      throw error;
    }
  },

  logCheckIn: async (empleadoId, fecha) => {
    try {
      const response = await axios.post(`${API_URL}/logs`, {
        employee_ID: empleadoId,
        entry: fecha,
      });
      return response.data;
    } catch (error) {
      console.error("Error registering entry:", error);
      throw error;
    }
  },

  logCheckOut: async (empleadoId, fecha) => {
    try {
      const response = await axios.patch(`${API_URL}/logs/${empleadoId}`, {
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
