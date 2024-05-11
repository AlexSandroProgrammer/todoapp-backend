const { Schema, model } = require("mongoose");

const CarSchema = Schema({
  placa: {
    type: String,
    required: true,
    unique: true,
  },
  numero_serie: {
    type: String,
    required: true,
    unique: true,
  },
  modelo: {
    type: Number,
    required: true,
  },
  marca: {
    type: String,
    required: true,
  },
  kilometraje: {
    type: Number,
    required: true,
  },
  tipo: {
    type: String,
    required: true,
  },
});

// export del modelo del carro
module.exports = model("Car", CarSchema);
