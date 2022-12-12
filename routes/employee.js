const express = require('express');
const employee = express.Router();
const db = require('../config/database');

employee.post('/', async (req, res, next) => {
    const  {name, fs_name, ms_name, phone_num, mail, address} = req.body;

    if(name && fs_name && ms_name && phone_num && mail && address){
        let query = "INSERT INTO employee (name, fs_name, ms_name, phone_num, mail, address)";
        query += ` VALUES ('${name}', '${fs_name}', '${ms_name}', ${phone_num}, '${mail}', '${address}')`;
        const rows = await db.query(query);

        if(rows.affectedRows == 1){
            return res.status(200).json({code: 201, message: "Empleado insertado correctamente"});
        }
        return res.status(500).json({code: 500, message: "Ocurrió un error"});
    }
    return res.status(500).json({code: 500, message: "Campos incompletos"});
});
 
employee.get('/', async (req, res, next) => {
    const employ = await db.query("SELECT * FROM employee;");
    return res.status(200).json({code: 200, message: employ});
    // .json para dar formato a lo que devuelve
});

employee.get('/:id', async (req, res, next) => {
    const id = req.params.id;
    if(id >= 0 ){
        const employ = await db.query("SELECT * FROM employee WHERE id ="+id+";");
        return res.status(200).json({code: 200, mesage: employ});
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
