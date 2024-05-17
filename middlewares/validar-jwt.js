const { response } = require("express");

const jwtValidation = (req, res = response, next) => {
  // x-token header
  const token = req.header("x-token");
  // si no encuentra el token le enviamos un mensaje de error al cliente
  if (!token) {
    console.log(token);
    return res.status(401).json({
      ok: false,
      message: "No has iniciado sesión",
    });
  }

  // si no hay ningun error
  try {
    const { uid, names } = jwt.verify(token, process.env.SECRET_PRIVATE_KEY);
    // asigamos los datos en la request
    req.uid = uid;
    req.names = names;
  } catch (error) {
    return res.status(401).json({
      ok: false,
      message: "El token no es valido para autenticarse",
    });
  }
  next();
};

// exportacion de la funcion que valida al token

module.exports = {
  jwtValidation,
};
