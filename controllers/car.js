// importacion de express response

const { response } = require("express");
const Car = require("../models/Car");

// controlador para registar el carro en nuestra base de datos
const createCar = async (req, res = response) => {
  const { placa, numero_serie } = req.body;
  try {
    let car = await Car.findOne({ placa, numero_serie });
    // validamos que no exista la placa o el numero de serie
    if (car) {
      res.status(400).json({
        message: "la placa o el numero de serie ya existen",
      });
    }
    // creamos el nuevo documento
    car = new Car(req.body);
    //registramos el carro
    await car.save();
    res.status(201).json({
      message: "registro de carro",
      placa,
      numero_serie,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
// controlador del listado de los carros registrados en nuestra base de datos
const getCars = async (req, res = response) => {
  const cars = await Car.find();
  return res.status(200).json({
    ok: true,
    message: "listado de carros",
    cars,
  });
};

// controlador del listado de los carro seleccionado

const getCarId = async (req, res = response) => {
  const { id } = req.params;

  try {
    const car = await Car.findById(id);
    if (!car) {
      return res.status(404).json({
        ok: false,
        message: "El id del carro enviado no fue encontrado",
      });
    }

    return res.status(200).json({
      ok: true,
      message: "Carro encontrado",
      car,
    });
  } catch (error) {
    console.log(
      `El error que estas presentando es el siguiente: ${error.message}`
    );
    res.status(500).json({
      message: error.message,
    });
  }
};

// controlador del listado de los carros registrados en nuestra base de datos
const updateCar = async (req, res = response) => {
  const carId = req.params.id;
  try {
    // obtenemos el carro que se va actualizar mediante el metodo FindById
    const car = await Car.findById(carId);
    // si no existe entonces le indicamos a nuestro cliente que el carro no esta registrado
    if (!car) {
      return res.status(404).json({
        message: "el carro no existe",
      });
    }
    // si todo sale bien en el manejo del controlador
    const newCar = {
      ...req.body,
    };

    const updateCar = await Car.findByIdAndUpdate(carId, newCar, {
      new: true,
    });

    if (updateCar) {
      res.status(200).json({
        ok: true,
        message: "actualizacion de carro correcta",
        carro: updateCar,
      });
    } else {
      res.status(500).json({
        message: "error al momento de actualizar los datos del carro",
      });
    }
  } catch (error) {
    console.log(
      `Error al momento de actualizar los datos del carro ${error.message}`
    );
    res.status(500).json({
      message: error.message,
    });
  }
};

// controlador del listado de los carros registrados en nuestra base de datos
const deleteCar = async (req, res = response) => {
  const carId = await req.params.id;
  try {
    const carIdValidation = await Car.findById(carId);
    if (!carIdValidation) {
      return res.status(404).json({
        ok: false,
        message: "el carro no existe",
      });
    }
    await Car.findByIdAndDelete(carId);
    res.status(200).json({
      ok: true,
      message: "eliminacion de carro exitosa",
    });
  } catch (error) {
    console.log(`Error al momento de eliminar el carro ${error.message}`);
    res.status(500).json({
      message:
        "Error al momento de eliminar el carro, comunicate con el administrador",
    });
  }
  res.json({
    message: "eliminacion de carro",
  });
};

// export controllores

module.exports = {
  getCars,
  createCar,
  updateCar,
  deleteCar,
  getCarId,
};
