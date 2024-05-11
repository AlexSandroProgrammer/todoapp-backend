// importacion de express
const express = require("express");

// importacion de la libreria para manejar las variables de entorno

require("dotenv").config();

// importacion de los cors
const cors = require("cors");
const { dbConnection } = require("./database/connection");

const app = express();

dbConnection();
// ejecucion de los cors
app.use(cors());

//* toda peticion desde del backend a la api
app.use(express.json());

// importacion de las rutas de la autenticacion del usuario
app.use("/api/auth", require("./routes/auth"));
// importacion de las rutas del carro
app.use("/api/car", require("./routes/cars"));
// importacion de las rutas del parque
app.use("/api/park", require("./routes/parks"));

// vamos a escuchar el puerto
app.listen(process.env.PORT, () => {
  console.log(`El servidor esta corriendo en el puerto ${process.env.PORT}`);
});
