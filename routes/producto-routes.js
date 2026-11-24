const router = require("express").Router();
const conexion = require("../conexion");

// Toma `producto` o `Producto` según cómo esté exportado en conexion.js
const producto = conexion.producto || conexion.Producto;

// Ruta raíz (/productos)
router.get("/", (req, res) => {
    res.render("pages/index");
});

// Ruta para página de insertar (/productos/insertarProducto)
router.get("/insertarProducto", (req, res) => {
    res.render("pages/insertarProducto");
});

// Petición para insertar un producto nuevo
router.post("/guardarProducto", (req, res) => {
    if (!producto) {
        return res.status(500).send("Error: el modelo producto no está exportado en conexion.js");
    }

    producto.create(req.body)
        .then(() => {
            console.log("Producto insertado con exito");
            res.redirect("/productos/listarProductos");
        })
        .catch((error) => {
            console.log("Error al insertar el producto: " + error);
            res.status(500).send("Error al insertar el producto");
        });
});

// Petición para obtener todos los productos
router.get("/listarProductos", (req, res) => {
    if (!producto) {
        return res.status(500).send("Error: el modelo producto no está exportado en conexion.js");
    }

    producto.findAll()
        .then((data) => {
            res.render("pages/listarProductos", { productos: data });
        })
        .catch((e) => {
            console.log("Error en la consulta: " + e);
            res.status(500).send("Error al listar los productos");
        });
});

// Petición para obtener un producto por su id
router.get("/buscarProducto/:idProducto", (req, res) => {
    if (!producto) {
        return res.status(500).send("Error: el modelo producto no está exportado en conexion.js");
    }

    producto.findAll({
        where: {
            idProducto: req.params.idProducto
        }
    })
        .then((data) => {
            res.render("pages/modificarProducto", { producto: data });
        })
        .catch((e) => {
            console.log("Error en la consulta: " + e);
            res.status(500).send("Error al buscar el producto");
        });
});

// Petición para modificar un producto
router.post("/modificarProducto", (req, res) => {
    if (!producto) {
        return res.status(500).send("Error: el modelo producto no está exportado en conexion.js");
    }

    const idProducto = req.body.idProducto;
    const productoModificado = {
        nombreProducto: req.body.nombreProducto,
        marcaProducto: req.body.marcaProducto,
        precioProducto: req.body.precioProducto
    };

    producto.update(productoModificado, {
        where: {
            idProducto: idProducto
        }
    })
        .then(() => {
            console.log("Producto modificado con exito");
            res.redirect("/productos/listarProductos");
        })
        .catch((e) => {
            console.log("Error al modificar el producto: " + e);
            res.status(500).send("Error al modificar el producto");
        });
});

// Petición para eliminar un producto
router.get("/eliminarProducto/:idProducto", (req, res) => {
    if (!producto) {
        return res.status(500).send("Error: el modelo producto no está exportado en conexion.js");
    }

    producto.destroy({
        where: {
            idProducto: req.params.idProducto
        }
    })
        .then(() => {
            console.log("Producto eliminado con exito");
            res.redirect("/productos/listarProductos");
        })
        .catch((e) => {
            console.log("Error al eliminar el producto: " + e);
            res.status(500).send("Error al eliminar el producto");
        });
});

module.exports = router;