/* 
Rutas para el manejo de los usuarios / Auth
    host + /api/auth
*/
// import router from express
const { Router } = require("express");
// importacion de express validator
const { check } = require("express-validator");
const { fieldsValidation } = require("../middlewares/validation");
// importacion de la validacion de la renovacion
const { jwtValidation } = require("../middlewares/validar-jwt");
// importacion de los controladores
const { registerUser, loginUser, renewToken } = require("../controllers/auth");

const router = Router();

// user register router

router.post(
  "/register",
  [
    check("names", "Debes ingresar tu nombre completo o tu primer nombre")
      .not()
      .isEmpty(),
    check("surnames", "Debes ingresar tus apellidos o tu primer apellido.")
      .not()
      .isEmpty(),
    check("email", "El email es requerido").not().isEmpty().isEmail(),
    check("number", "Debes ingresar tu numero de celular")
      .not()
      .isEmpty()
      .isLength({
        min: 10,
        max: 12,
      }),
    check(
      "password",
      "La contraseña debe ser minimo de 6 digitos y maximo de 20 digitos"
    )
      .not()
      .isEmpty()
      .isLength({
        min: 6,
        max: 20,
      }),
  ],
  fieldsValidation,
  registerUser
);

// ruta del logueo del usuario del usuario
router.post(
  "/",
  [
    check("email", "El email es requerido").not().isEmpty(),
    check(
      "password",
      "La contraseña debe ser minimo de 6 digitos y maximo de 20 digitos"
    )
      .not()
      .isEmpty()
      .isLength({
        min: 6,
        max: 20,
      }),
  ],
  fieldsValidation,
  loginUser
);

// ruta para renovar el token del usuario

router.get("/renew", jwtValidation, renewToken);

// exportar el router

module.exports = router;
