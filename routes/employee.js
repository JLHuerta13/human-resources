const express = require('express');
const employee = express.Router();
const db = require('../config/database');

employee.post('/', (req, res, next) => {
    return res.status(200).send(req.body);
});
 
employee.get('/', async (req, res, next) => {
    const employ = await db.query("SELECT * FROM employee;");
    return res.status(200).json(employ);
    // .json para dar formato a lo que devuelve
});

employee.get('/:id', (req, res, next) => {
    const id = req.params.id - 1;
    if(id >= 0 && id < employee.length){
        return res.status(200).send(employ[req.params.id - 1]);
    }else {
        return res.status(404).send("Empleado no encontrado")
    }
});

employee.get('/:fs_name/:ms_name([A-Za-z]+)', (req, res, next) => {
    const fs_name = req.params.fs_name;
    const ms_name = req.params.ms_name;       

        const emp = employ.filter((e) => {
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

module.exports = employee;
