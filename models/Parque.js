const { Schema, model } = require("mongoose");

const ParqueSchema = Schema({
  nombre: {
    type: String,
    required: true,
    unique: true,
  },
  capacidad: {
    type: Number,
    required: true,
  },
  precioEntrada: {
    type: Number,
    required: true,
  },
  descripcion: {
    type: String,
    required: true,
  },
});

// exportacion del nuevo modelo
module.exports = model("Parque", ParqueSchema);
