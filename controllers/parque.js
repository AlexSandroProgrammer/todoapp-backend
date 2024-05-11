// importacion de express response

const { response } = require("express");
const Parque = require("../models/Parque");

// controlador para registar el parque en nuestra base de datos
const createPark = async (req, res = response) => {
  const { nombre } = req.body;
  try {
    let parque = await Parque.findOne({ nombre });
    if (parque) {
      return res.status(400).json({
        ok: false,
        message: "Ya existe un parque con ese nombre",
      });
    }

    parque = new Parque(req.body);
    await parque.save();

    res.status(201).json({
      ok: true,
      message: "Parque creado con exito",
      parque,
    });
  } catch (error) {
    console.log(
      `Error al momento de crear el parque. el error es: ${error.message}`
    );

    res.status(500).json({
      ok: false,
      message:
        "Error al momento de crear el parque, comunicate con tu administrador",
    });
  }
};
// controlador del listado de los parques registrados en nuestra base de datos
const getParks = async (req, res = response) => {
  const parks = await Parque.find();
  try {
    return res.status(200).json({
      ok: true,
      message: "Listado de parques",
      parks,
    });
  } catch (error) {
    console.log(
      `Error al momento de listar los parques. el error es: ${error.message}`
    );

    return res.status(500).json({
      ok: false,
      message:
        "Error al momento de listar los parques, comunicate con tu administrador",
    });
  }
};

// controlador de actualizacion del parque seleccionado
const updatePark = async (req, res = response) => {
  // recibimos el id del parque
  const parkId = req.params.id;
  try {
    // verificamos que el evento exista en la colecccion
    const parque = await Parque.findById(parkId);
    //! si no existe el registro entonces le inforamos al cliente o al usuario
    if (!parque) {
      return res.status(404).json({
        ok: false,
        message: "El registro del Parque no fue encontrado",
      });
    }

    const newPark = {
      ...req.body,
    };

    const updatePark = await Parque.findByIdAndUpdate(parkId, newPark, {
      new: true,
    });

    if (updatePark) {
      res.status(200).json({
        ok: true,
        message: "Parque actualizado con exito",
        parque: updatePark,
      });
    } else {
      res.status(404).json({
        ok: false,
        message: "¡Upps!, El Parque no fue actualizado",
      });
    }
  } catch (error) {
    console.log(
      `Error al momento de actualizar el parque. el error es: ${error.message}`
    );
  }
};

const getParkId = async (req, res = response) => {
  const getParkId = await req.params.id;
  try {
    const parkSelect = await Parque.findById(getParkId);
    if (!parkSelect) {
      return res.status(404).json({
        ok: false,
        message: "El id del parque enviado no fue encontrado",
      });
    }

    return res.status(200).json({
      ok: true,
      message: "Parque encontrado",
      parkSelect,
    });
  } catch (error) {
    console.log(
      `El error que estas presentando es el siguiente: ${error.message}`
    );
    res.status(500).json({
      ok: false,
      message:
        "Error al momento de buscar el parque seleccionado, comunicate con tu administrador",
    });
  }
};

// controlador del listado de los carros registrados en nuestra base de datos
const deletePark = async (req, res = response) => {
  const parkId = await req.params.id;

  try {
    // verificiamos que exista el id del parque
    const parkIdVerification = await Parque.findById(parkId);
    if (!parkIdVerification) {
      return res.status(404).json({
        ok: false,
        message: "El id del parque enviado no fue encontrado",
      });
    }
    // borramos el registro del parque
    await Parque.findByIdAndDelete(parkId);

    res.status(200).json({
      ok: true,
      message: "Parque eliminado con exito",
    });
  } catch (error) {
    console.log(
      `El error que estas presentando es el siguiente: ${error.message}`
    );
    res.status(500).json({
      ok: false,
      message:
        "Error al momento de eliminar el parque, comunicate con tu administrador",
    });
  }
};

// export controllores

module.exports = {
  createPark,
  getParks,
  updatePark,
  deletePark,
  getParkId,
};
