const mysql = require('mysql');
const util = require('util');

// Pool para varias conexiones de manera simultanea
const pool = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user:'root',
    password: '',
    database: 'humanresources'
});

pool.query = util.promisify(pool.query);

module.exports = pool;