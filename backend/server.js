const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const employeesRoutes = require("./routes/employees");
const registriesRoutes = require("./routes/registries");

dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Conexión a MongoDB exitosa."))
  .catch((err) => console.error("Error de conexión a MongoDB:", err));

app.use("/api/empleados", employeesRoutes);
app.use("/api/registros", registriesRoutes);

app.listen(PORT, () => {
  console.log(`Exactian Challenge Server! corriendo en el puerto ${PORT}`);
});
