const bodyparser = require('body-parser');
const express = require('express');
const app = express();
// Enlace con la base de datos 
const {employee} = require('./employees.json');

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true}));


// Ruta "/" 
app.get("/", (req, res, next) => {
    return res.status(200).send("Bienvenido");
});

app.post('/employee', (req, res, next) => {
    return res.status(200).send(req.body);
});

// Ruta "/name" 
app.get('/employee', (req, res, next) => {
    return res.status(200).send(employee);
});

app.get('/employee/:id', (req, res, next) => {
    const id = req.params.id - 1;
    if(id >= 0 && id < employee.length){
        return res.status(200).send(employee[req.params.id - 1]);
    }else {
        return res.status(404).send("Empleado no encontrado")
    }
});

app.get('/employee/:fs_name/:ms_name([A-Za-z]+)', (req, res, next) => {
    const fs_name = req.params.fs_name;
    const ms_name = req.params.ms_name;       

        const emp = employee.filter((e) => {
            if(e.fs_name.toUpperCase() == fs_name.toUpperCase()) {
                if(e.ms_name.toUpperCase() == ms_name.toUpperCase()) {
                    return e;
                }
            }
        });
        if(emp.length > 0){
            return res.status(200).send(emp);
        }
        return res.status(404).send("Empleado no encontrado");
    }
);

// Inicializacion de servidor 
app.listen(process.env.PORT || 3000, () => {
    console.log("Server is running...");
});