const express = require('express');
const employee = express.Router();
const db = require('../config/database');

//INSERTAR EMPLEADO
employee.post('/', async (req, res, next) => {
    const { name, fs_name, ms_name, phone_num, mail, address } = req.body;

    if(name && fs_name && ms_name && phone_num && mail && address){
        let query = "INSERT INTO employee (name, fs_name, ms_name, phone_num, mail, address)";
        query += ` VALUES ('${name}', '${fs_name}', '${ms_name}', ${phone_num}, '${mail}', '${address}')`;
        const rows = await db.query(query);

        if(rows.affectedRows == 1){
            return res.status(200).json({code: 201, message: "Empleado insertado correctamente"});
        }
        return res.status(404).json({code: 404, message: "Ocurrió un error"});
    }
    return res.status(500).json({code: 500, message: "Campos incompletos"});
});

//ELIMINAR EMPLEADO
employee.delete("/:id([0-9]{1,3})", async (req, res, next) => {
    const query = `DELETE FROM employee WHERE id=${req.params.id}`;
    const rows = await db.query(query);

    if(rows.affectedRows == 1){
        return res.status(200).json({code: 200, message:"Empleado Borrado Exitosamente"})
    }
    return res.status(404).json({code:404, message:"Empleado No Encontrado"});
});

//ACTUALIZAR EMPLEADO
employee.put("/:id([0-9]{1,3})", async (req, res, next) => {
    const  {name, fs_name, ms_name, phone_num, mail, address} = req.body;
    if(name && fs_name && ms_name && phone_num && mail && address){

        let query = `UPDATE employee SET name='${name}', fs_name='${fs_name}',`; 
        query += `ms_name='${ms_name}', phone_num=${phone_num}, mail='${mail}', address='${address}'`; 
        query += ` WHERE id=${req.params.id};`;
        
        const rows = await db.query(query);
        console.log(rows);

        if(rows.affectedRows==1){
            return res.status(200).json({code: 200, message: "Empleado actualizado correctamente."});
        }
        return res.status(500).json({code: 500, message: "Ocurrio un error."});
    }
    return res.status(500).json({code: 500, message: "Campos incompletos"});
    
});

//ACTUALIZAR UN ELEMENTO DEL EMPLEADO
employee.patch("/:id([0-9]{1,3})", async (req, res, next) => {
    if(req.body.name){
        let query = `UPDATE employee SET name='${req.body.name}' where id=${req.params.id}`;
        
        const rows = await db.query(query);
        console.log(rows);

        if(rows.affectedRows==1){
            return res.status(200).json({code: 200, message: "Nombre de empleado actualizado correctamente."});
        }

        return res.status(500).json({code: 500, message:"Ocurrió un error"});
    }else{
        if(req.body.fs_name){
            let query = `UPDATE employee SET fs_name='${req.body.fs_name}' where id=${req.params.id}`;

            const rows = await db.query(query);
            console.log(rows);

            if(rows.affectedRows==1){
                return res.status(200).json({code: 200, message: "Apellido de empleado actualizado correctamente."});
            }

            return res.status(500).json({code: 500, message:"Ocurrió un error"});
        }else{
            if(req.body.ms_name){
                let query = `UPDATE employee SET ms_name='${req.body.ms_name}' where id=${req.params.id}`;

                const rows = await db.query(query);
                console.log(rows);

                if(rows.affectedRows==1){
                    return res.status(200).json({code: 200, message: "Apellido de empleado actualizado correctamente."});
                }

                return res.status(500).json({code: 500, message:"Ocurrió un error"});
            }else{
                if(req.body.phone_num){
                    let query = `UPDATE employee SET phone_num=${req.body.phone_num} where id=${req.params.id}`;

                    const rows = await db.query(query);
                    console.log(rows);

                    if(rows.affectedRows==1){
                        return res.status(200).json({code: 200, message: "Numero de telefono de empleado actualizado correctamente."});
                    }

                    return res.status(500).json({code: 500, message:"Ocurrió un error"});
                }else{
                    if(req.body.mail){
                        let query = `UPDATE employee SET mail='${req.body.mail}' where id=${req.params.id}`;

                        const rows = await db.query(query);
                        console.log(rows);

                        if(rows.affectedRows==1){
                            return res.status(200).json({code: 200, message: "Mail de empleado actualizado correctamente."});
                        }

                        return res.status(500).json({code: 500, message:"Ocurrió un error"});
                    }else{
                        if(req.body.address){
                            let query = `UPDATE employee SET address='${req.body.address}' where id=${req.params.id}`;

                            const rows = await db.query(query);
                            console.log(rows);

                            if(rows.affectedRows==1){
                                return res.status(200).json({code: 200, message: "Dirección de empleado actualizado correctamente."});
                            }

                            return res.status(500).json({code: 500, message:"Ocurrió un error"});
                            }
                    }
                }
            }
        }
    }
    return res.status(500).json({code:500, message:"Campos Incompletos"});
});

//OBTENER LISTA DE EMPLEADOS
employee.get('/', async (req, res, next) => {
    const employ = await db.query("SELECT * FROM employee;");
    return res.status(200).json({code: 200, message: employ});
    // .json para dar formato a lo que devuelve
});

//OBTENER EMPLEADO POR ID
employee.get('/:id([0-9]{1,3})', async (req, res, next) => {
    const id = req.params.id;
    if(id >= 0 ){
        const employ = await db.query("SELECT * FROM employee WHERE id ="+id+";");
        return res.status(200).json({code: 200, mesage: employ});
    }else {
        return res.status(404).send({code: 404, message: "Empleado no encontrado"});
    }
});

//OBTENER EMPLEADO POR NOMBRE Y APELLIDOS
employee.get('/:name/:fs_name/:ms_name([A-Za-z]+)', async (req, res, next) => {
    const name = req.params.name;
    const fs_name = req.params.fs_name;
    const ms_name = req.params.ms_name;  

    const employ = await db.query("SELECT * FROM employee WHERE name='"+name+"' && fs_name='"+fs_name+"' && ms_name='"+ms_name+"';");
        if(employ.length > 0){
            return res.status(200).json({code: 1, mesage: employ});
        }
        return res.status(404).send({code: 404, message: "Empleado no encontrado"});
    }
);

module.exports = employee;
