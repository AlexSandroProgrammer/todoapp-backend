/* 
    Rutas de Carros / Car
    host  + /api/car
*/
// importamos router de express
const { Router } = require("express");
// importacion del metodo check
const { check } = require("express-validator");
// importamos el middleware de autenticacion del toke
const { jwtValidation } = require("../middlewares/validar-jwt");
// importacion del middleware para la validacion de los campos
const { fieldsValidation } = require("../middlewares/validation");
const {
  getCars,
  createCar,
  updateCar,
  deleteCar,
  getCarId,
} = require("../controllers/car");
// almacenamos las diferentes herramientas de router
// en una variable
const router = Router();

// toda ruta debe pasar por la autenticacion del token

// router.use(jwtValidation);
// * car router get

router.get("/", getCars);

// llamado de datos a un registro por id
router.get("/:id", getCarId);

// * create car method post

router.post(
  "/create",
  [
    check("placa", "La placa del vehiculo es obligatoria").notEmpty().isLength({
      min: 6,
      max: 6,
    }),
    check("numero_serie", "El numero de serie del vehiculo es obligatorio")
      .notEmpty()
      .isLength({
        min: 17,
        max: 17,
      }),
    check("modelo", "El modelo del vehiculo es obligatorio")
      .notEmpty()
      .isNumeric()
      .isLength({
        min: 4,
        max: 4,
      }),
    check("marca", "La marca del vehiculo es obligatorio").notEmpty().isLength({
      min: 3,
      max: 20,
    }),
    check("kilometraje", "El kilometraje del vehiculo es obligatorio")
      .notEmpty()
      .isNumeric()
      .isLength({
        min: 1,
        max: 7,
      }),

    check("tipo", "El tipo del vehiculo es obligatorio").notEmpty().isLength({
      min: 1,
      max: 20,
    }),
    fieldsValidation,
  ],
  createCar
);

// * update car method put

router.put(
  "/:id",
  [
    check("placa", "La placa del vehiculo es obligatoria").notEmpty().isLength({
      min: 6,
      max: 6,
    }),
    check("numero_serie", "El numero de serie del vehiculo es obligatorio")
      .notEmpty()
      .isLength({
        min: 17,
        max: 17,
      }),
    check("modelo", "El modelo del vehiculo es obligatorio")
      .notEmpty()
      .isNumeric()
      .isLength({
        min: 4,
        max: 4,
      }),
    check("marca", "La marca del vehiculo es obligatorio").notEmpty().isLength({
      min: 3,
      max: 20,
    }),
    check("kilometraje", "El kilometraje del vehiculo es obligatorio")
      .notEmpty()
      .isNumeric()
      .isLength({
        min: 1,
        max: 7,
      }),

    check("tipo", "El tipo del vehiculo es obligatorio").notEmpty().isLength({
      min: 1,
      max: 20,
    }),
    fieldsValidation,
  ],
  updateCar
);

// * car router get

router.delete("/:id", deleteCar);

// exportamos el router

module.exports = router;
