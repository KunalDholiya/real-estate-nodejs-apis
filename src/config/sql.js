const mysql = require('mysql')
const { db } = require('./../config/vars');

mysql.Promise = Promise;

const pool = mysql.createPool({
    connectionLimit: 100,
    host: db.host,
    user: db.user,
    password: db.password,
    database: db.database,
    port: db.port,
    debug: false
});

pool.getConnection((err, connection) => {
    return new Promise((resolve, reject) => {
        if (err) {
            if (err.code === 'PROTOCOL_CONNECTION_LOST') {
                reject('Database connection was closed.');
            }
            if (err.code === 'ER_CON_COUNT_ERROR') {
                reject('Database has too many connections.');
            }
            if (err.code === 'ECONNREFUSED') {
                reject('Database connection was refused.');
            }
        }
        if (connection) connection.release()
        resolve();
    });
});

module.exports = pool