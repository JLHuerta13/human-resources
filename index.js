const bodyparser = require('body-parser');
const morgan = require('morgan');
const express = require('express');
const app = express();
const employee = require('./routes/employee');

app.use(morgan('dev'));
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true}));


app.get("/", (req, res, next) => {
    return res.status(200).send("Bienvenido");
});

app.use("/employee", employee);


// Inicializacion de servidor 
app.listen(process.env.PORT || 3000, () => {
    console.log("Server is running...");
});