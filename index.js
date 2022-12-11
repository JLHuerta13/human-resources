const express = require('express');
const app = express();

/* Ruta "/" */ 
app.get("/", (req, res, next) => {
    res.status(200);
    res.send("Bienvenido ");
});

/* Ruta "/name" */
app.get("/:name", (req, res, next) => {
    console.log(req.params.name);
    res.status(200);
    res.send("Estas en la pagina nombre " + req.params.name); 
})

/*Inicializacion de servidor*/ 
app.listen(process.env.PORT || 3000, () => {
    console.log("Server is running...");
});