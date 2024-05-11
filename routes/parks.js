/* 
    Rutas de Carros / Park
    host  + /api/park
*/
// importamos router de express
const { Router } = require("express");
// importacion del metodo check
const { check } = require("express-validator");
const { jwtValidation } = require("../middlewares/validar-jwt");
// importacion del middleware para la validacion de los campos
const { fieldsValidation } = require("../middlewares/validation");
const {
  createPark,
  getParks,
  updatePark,
  deletePark,
  getParkId,
} = require("../controllers/parque");
// almacenamos las diferentes herramientas de router
// en una variable
const router = Router();

router.use(jwtValidation);
// * select park router get
router.get("/:id", getParkId);

// * park router get

router.get("/", getParks);

// * create car method post

router.post(
  "/register",
  [
    check("nombre", "El nombre del parque es obligatorio").notEmpty().isLength({
      min: 4,
      max: 100,
    }),

    check("capacidad", "Debe ingresar la capacidad que puede tener el parque")
      .notEmpty()
      .isNumeric()
      .isLength({
        min: 1,
        max: 5,
      }),

    check(
      "precioEntrada",
      "Debe ingresar el precio de entrada que puede tener el parque"
    )
      .notEmpty()
      .isNumeric()
      .isLength({
        min: 4,
        max: 10,
      }),
    check(
      "descripcion",
      "Debe ingresar la descripcion que puede tener el parque"
    )
      .notEmpty()
      .isLength({
        min: 4,
        max: 200,
      }),
    fieldsValidation,
  ],
  createPark
);

// * update car method put

router.put(
  "/:id",
  [
    check("nombre", "El nombre del parque es obligatorio").notEmpty().isLength({
      min: 4,
      max: 100,
    }),

    check("capacidad", "Debe ingresar la capacidad que puede tener el parque")
      .notEmpty()
      .isNumeric()
      .isLength({
        min: 1,
        max: 5,
      }),

    check(
      "precioEntrada",
      "Debe ingresar el precio de entrada que puede tener el parque"
    )
      .notEmpty()
      .isNumeric()
      .isLength({
        min: 4,
        max: 10,
      }),
    check(
      "descripcion",
      "Debe ingresar la descripcion que puede tener el parque"
    )
      .notEmpty()
      .isLength({
        min: 4,
        max: 200,
      }),
    fieldsValidation,
  ],
  updatePark
);

// * park router delete

router.delete("/:id", deletePark);

// exportamos el router

module.exports = router;
