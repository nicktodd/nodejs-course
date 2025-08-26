const mysql = require( 'mysql2');

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "n3u3da!",
    database: "pubs"
});

connection.query("select * from authors",(error, results, fields) => {
    console.log("Error: " + error);
    console.log(results);
});

connection.end();