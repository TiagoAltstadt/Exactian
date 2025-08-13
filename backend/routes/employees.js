const express = require('express');
const router = express.Router();
const Employee = require('../models/Employee');

router.get('/', async (req, res) => {
  try {
    const employees = await Employee.find();
    res.json(employees);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

router.get('/dentro', async (req, res) => {
  try {
    const employees = await Employee.find({ state: true });
    res.json(employees);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

module.exports = router;