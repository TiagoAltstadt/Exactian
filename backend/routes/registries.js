const express = require('express');
const router = express.Router();
const Employee = require('../models/Employee');
const Registry = require('../models/Registry');

router.post('/', async (req, res) => {
  const { employee_ID, entry } = req.body;
  try {
    const employee = await Employee.findById(employee_ID);

    if (employee.state === true) {
      return res.status(400).json({ msg: 'Empleado esta trabajando' });
    }

    const newRegistry = new Registry({
      employee_ID,
      entry,
    });

    await newRegistry.save();

    employee.state = true;
    employee.last_exit = null;
    await employee.save();

    res.status(201).json({ msg: 'Entrada registrada correctamente', newRegistry });

  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

router.patch('/:employee_ID', async (req, res) => {
  const { employee_ID } = req.params;
  const { exit } = req.body;
  try {
    const employee = await Employee.findById(employee_ID);

    if (employee.state === false) {
      return res.status(400).json({ msg: 'Empleado no esta trabajando' });
    }

    const registry = await Registry.findOne({ employee_ID, exit: null }).sort({ entry: -1 });

    registry.exit = exit;
    await registry.save();

    const entryTime = new Date(registry.entry);
    const exitTime = new Date(exit);
    const timeDifference = exitTime.getTime() - entryTime.getTime();
    const hours = timeDifference / (1000 * 60 * 60);

    employee.state = false;
    await employee.save();

    let responseMsg = 'Salida registrada correctamente';
    if (hours > 8) {
      responseMsg += 'Atencion: Segun los datos, se registraran mas de 8 horas de trabajo.';
    }

    res.status(200).json({ msg: responseMsg, registry, hours });

  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

module.exports = router;