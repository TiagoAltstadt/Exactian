const express = require("express");
const router = express.Router();
const Employee = require("../models/Employee");
const Registry = require("../models/Registry");

// Endpoint para obtener todos los registros
router.get("/", async (req, res) => {
  try {
    const registries = await Registry.find().populate("employee_ID");
    res.json(registries);
  } catch (err) {
    console.error("Error al obtener registros:", err);
    res.status(500).json({ msg: "Server error" });
  }
});
// Endpoint para obtener todos los registros por ID
router.get("/:employee_ID", async (req, res) => {
  const { employee_ID } = req.params;

  try {
    const registries = await Registry.find({
      employee_ID: employee_ID,
    }).populate("employee_ID");
    if (registries.length === 0) {
      return res
        .status(200)
        .json([]);
    }
    res.json(registries);
  } catch (err) {
    console.error("Error al obtener registros:", err);
    res.status(500).json({ msg: "Server error" });
  }
});

// Endpoint para registrar un nuevo ingreso
router.post("/", async (req, res) => {
  const { employee_ID, entry } = req.body;

  try {
    const employee = await Employee.findById(employee_ID);
    if (!employee) {
      return res.status(404).json({ msg: "Empleado no encontrado." });
    }

    // Validación 1: Verificar si ya hay un registro abierto
    const openRegistry = await Registry.findOne({ employee_ID, exit: null });
    if (openRegistry) {
      return res
        .status(400)
        .json({ msg: "El empleado ya tiene un registro de ingreso activo." });
    }

    // Si no hay un registro abierto, se crea uno nuevo
    const newRegistry = new Registry({
      employee_ID,
      entry,
    });

    await newRegistry.save();

    // Actualizar el estado del empleado
    employee.state = true;
    employee.last_exit = null;
    await employee.save();

    res
      .status(201)
      .json({ msg: "Entrada registrada correctamente", newRegistry });
  } catch (err) {
    console.error("Error al registrar entrada:", err);
    res.status(500).json({ msg: "Server error" });
  }
});

// Endpoint para registrar un egreso
router.patch("/:employee_ID", async (req, res) => {
  const { employee_ID } = req.params;
  const { exit } = req.body;
  try {
    const employee = await Employee.findById(employee_ID);
    if (!employee) {
      return res.status(404).json({ msg: "Empleado no encontrado." });
    }

    // Validación 2: El empleado no puede egresar si no tiene un registro abierto
    const openRegistry = await Registry.findOne({
      employee_ID,
      exit: null,
    }).sort({ entry: -1 });
    if (!openRegistry) {
      return res
        .status(400)
        .json({ msg: "El empleado no tiene un registro de ingreso activo." });
    }

    // Actualizar el registro abierto con la hora de salida
    openRegistry.exit = exit;
    await openRegistry.save();

    // Calcular el tiempo transcurrido
    const entryTime = new Date(openRegistry.entry);
    const exitTime = new Date(exit);
    const timeDifference = exitTime.getTime() - entryTime.getTime();
    const hours = timeDifference / (1000 * 60 * 60);

    // Actualizar el estado del empleado
    employee.state = false;
    await employee.save();

    let responseMsg = "Salida registrada correctamente";
    if (hours > 8) {
      responseMsg +=
        ". Atención: Segun los datos, se registraron más de 8 horas de trabajo.";
    }

    res.status(200).json({ msg: responseMsg, registry: openRegistry, hours });
  } catch (err) {
    console.error("Error al registrar salida:", err);
    res.status(500).json({ msg: "Server error" });
  }
});

module.exports = router;
