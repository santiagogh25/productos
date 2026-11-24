const { Sequelize } = require("sequelize");
const productoModelo = require("./models/producto");

const conexion = new Sequelize("productos", "root", "117021", {
    host: "localhost",
    port: 3306,
    dialect: "mysql"
});

const Producto = productoModelo(conexion);

conexion.sync({ force: false })
    .then(() => {
        console.log("Conexion establecida con exito");
    })
    .catch((error) => {
        console.log("Error al conectar a la base de datos: " + error);
    });

module.exports = {
    conexion,
    Producto
};