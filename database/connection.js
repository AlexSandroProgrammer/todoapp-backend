const mongoose = require("mongoose");
const dbConnection = async () => {
  try {
    mongoose.connect(process.env.DB_CONNECTION);
    console.log("Conexion a base de datos exitosa");
  } catch (error) {
    console.log(
      `Error de conexion a la base de datos, el error es ${error.message}`
    );
  }
};

module.exports = {
  dbConnection,
};
