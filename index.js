//DEPENDENCIES
const morgan = require('morgan');
const express = require('express');
const app = express();

//ROUTERS
const employee = require('./routes/employee');
const user = require('./routes/user');

//MIDDLEWARE
const auth = require('./middleware/auth');
const notFound = require('./middleware/notfound');
const indexjs = require('./middleware/index');

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get("/", indexjs);
app.use("/user", user);
app.use(auth);
app.use("/employee", employee);
app.use(notFound);

// Inicializacion de servidor 
app.listen(process.env.PORT || 3000, () => {
    console.log("Server is running...");
});