// importamos la libreria de json web token
const jwt = require("jsonwebtoken");

// creamos funcion el cual se va encargar de generar los json web tokens

const generateToken = (uid, name) => {
  // realizamos el retorno de una promesa el cual dependiendo del estado la resolvemos o la devolvemos
  return new Promise((resolve, reject) => {
    // le pasamos el id del usuario y el nombre
    const payload = { uid, name };
    // generamos el token con la libreria de json web token
    jwt.sign(
      payload,
      process.env.SECRET_PRIVATE_KEY,
      // tiempo de expiracion para el token
      {
        expiresIn: "2h",
      },
      // si hay algun error entonces devolvemos el callback y si no entonces el token
      (err, token) => {
        if (err) {
          console.error(`Error al momento de renovar el token: ${err.message}`);
        } else {
          resolve(token);
        }
      }
    );
  });
};

module.exports = {
  generateToken,
};
