const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const employeesRoutes = require("./routes/employees");
const registriesRoutes = require("./routes/registries");

dotenv.config({path: '../.env' });

const app = express();

const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("|- MongoDB ✅          |");
    console.log(" ---------------------");
    console.log("");
  })
  .catch((err) => console.error("Error de conexión a MongoDB:", err));

app.use("/api/empleados", employeesRoutes);
app.use("/api/logs", registriesRoutes);

app.listen(PORT, () => {
  console.clear();
  console.log(" Exactian challenge Server, by Tiago Altstadt.");
  console.log(" ----------------------");
  console.log(`|- Database: ✅ (${PORT}) |`);
});
