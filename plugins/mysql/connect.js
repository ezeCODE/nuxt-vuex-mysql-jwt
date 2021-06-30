 const mysql = require("mysql");
 const jwt = require("jsonwebtoken");

 //en produccion no es necesario la conexcion aqui, 
 // solo se haria por api res
 const connection = mysql.createConnection({
     host: 'localhost',
     user: 'usereze',
     password: 'pass123',
     database: 'usuarios',

 })

 connection.connect()

 connection.on('error', function(err) {
     console.log("[mysql error]", err);
 })

 export { connection, jwt }