const express = require('express');
const app = express();
/* Enlace con la base de datos */
const {employee} = require('./employees.json');

/* Ruta "/" */ 
app.get("/", (req, res, next) => {
    res.status(200);
    res.send("Bienvenido");
});

/* Ruta "/name" */
app.get('/employee', (req, res, next) => {
    res.status(200); 
    res.send(employee);
});

app.get('/employee/:id', (req, res, next) => {
    res.status(200);
    res.send(employee[req.params.id - 1]);
});

/*Inicializacion de servidor*/ 
app.listen(process.env.PORT || 3000, () => {
    console.log("Server is running...");
});