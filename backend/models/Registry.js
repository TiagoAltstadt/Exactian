const mongoose = require("mongoose");

const RegistrySchema = new mongoose.Schema(
  {
    employee_ID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employee",
      required: true,
    },
    entry: {
      type: Date,
      required: true,
    },
    exit: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Registry", RegistrySchema);
