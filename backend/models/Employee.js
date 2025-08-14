const mongoose = require('mongoose');

const EmployeeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  surname: {
    type: String,
    required: true,
  },
  dni: {
    type: String,
    required: true,
    unique: true,
  },
  state: {
    type: Boolean,
    default: false,
  },
  last_exit: {
    type: Date,
    default: null,
  },
  last_entry: {
    type: Date,
    default: null,
  },
});

module.exports = mongoose.model('Employee', EmployeeSchema);