const express = require('express');
const employee = express.Router();
const db = require('../config/database');

employee.post('/', (req, res, next) => {
    return res.status(200).json(req.body);
});
 
employee.get('/', async (req, res, next) => {
    const employ = await db.query("SELECT * FROM employee;");
    return res.status(200).json({code: 1, message: employ});
    // .json para dar formato a lo que devuelve
});

employee.get('/:id', async (req, res, next) => {
    const id = req.params.id;
    if(id >= 0 && id < employee.length){
        const employ = await db.query("SELECT * FROM employee WHERE id ="+id+";");
        return res.status(200).json({code: 1, mesage: employ});
    }else {
        return res.status(404).send({code: 404, message: "Empleado no encontrado"});
    }
});

employee.get('/:fs_name/:ms_name([A-Za-z]+)', async (req, res, next) => {
    const fs_name = req.params.fs_name;
    const ms_name = req.params.ms_name;  

    const employ = await db.query("SELECT * FROM employee WHERE fs_name='"+fs_name+"' && ms_name='"+ms_name+"';");
        if(employ.length > 0){
            return res.status(200).json({code: 1, mesage: employ});
        }
        return res.status(404).send({code: 404, message: "Empleado no encontrado"});
    }
);

module.exports = employee;
