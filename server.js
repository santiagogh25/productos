const express = require("express");
const path = require("path");
const app = express();

require("./conexion");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const productosRutas = require("./routes/producto-routes");
app.use("/productos", productosRutas);

app.listen(3000, () => {
    console.log("Servidor corriendo en el puerto 3000");
});