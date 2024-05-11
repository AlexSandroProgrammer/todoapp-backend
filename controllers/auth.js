const { response } = require("express");
//importacion del paquete para la encriptacion de contraseñas
const bcrypt = require("bcryptjs");
// importacion del modelo del usuario
const User = require("../models/User");
// importacion de la funcion para genera el token

const { generateToken } = require("../helpers/jwt");

// controlador para el registro del usuario

const registerUser = async (req, res = response) => {
  // body request desectructurar lo que es email y el password
  const { email, password } = req.body;
  try {
    // verificamos que el email no exista en la base de datos
    let user = await User.findOne({ email });
    // creamos la condicional
    if (user) {
      return res.status(400).json({
        ok: false,
        message: "Ya existe un usuario con ese email",
      });
    }

    user = new User(req.body);

    // encriptacion de la contraseña
    const hashSalt = bcrypt.genSaltSync(10);
    user.password = bcrypt.hashSync(password, hashSalt);

    // guardamos los datos del usuario
    await user.save();
    // generamos el token del usuario
    const token = await generateToken(user.uid, user.names);

    // si no hay ningun problema en la validacion entonces le damos el mensaje de confirmacion al cliente
    res.status(201).json({
      ok: true,
      message: "Usuario creado con exito",
      uid: user.uid,
      names: user.names,
      surnames: user.surnames,
      token,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      message:
        "Error al momento de guardar los datos, comunicate con tu administrador",
    });
    console.error(
      `Errr al momento de guardar los datos, el error es: ${error.message}`
    );
  }
};

// controlador para el logueo del usuario

const loginUser = async (req, res = response) => {
  // desestructuramos el emai y el password del usuario
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        ok: false,
        message: "El usuario no esta registrado",
      });
    }

    // confirmacion de la contraseñas
    const hashPassword = bcrypt.compareSync(password, user.password);
    if (!hashPassword) {
      return res.status(400).json({
        ok: false,
        message:
          "La contraseña es incorrecta, por favor revisa tus credenciales",
      });
    }

    // generar el json web token
    const token = await generateToken(user.uid, user.names);

    res.status(200).json({
      ok: true,
      message: "Usuario logueado con exito",
      uid: user.uid,
      names: user.names,
      surnames: user.surnames,
      token,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      message: "Error al momento de loguearte, comunicate con tu administrador",
    });
    console.error(`Error al momento de loguear, el error es: ${error.message}`);
  }
};

// renoacion del token

const renewToken = async (req, res = response) => {
  // extraer los datos del usuario para generar el json web token
  const { uid, names } = req;
  // generamos un nuevo nuevo token
  const token = await generateToken(uid, names);

  // enviamos el token al usuario con una respuesta
  res.status(200).json({
    ok: true,
    message: "Token renovar con exito",
    uid,
    names,
    surnames,
    token,
  });
};

module.exports = {
  registerUser,
  loginUser,
  renewToken,
};
