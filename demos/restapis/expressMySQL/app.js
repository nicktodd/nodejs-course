const mysql = require('mysql2');
const express = require("express"); 

const app = express();
app.use(express.json());
const port = 4000;

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "n3u3da!",
    database: "pubs"

});


app.get("/authors", (req,res) => {
    connection.query("select * from authors", (error,results) => {
        return res.json(results);
    });
});


app.get("/authors/:id", (req,res) => {
    connection.query(`select * from authors where au_id = '${req.params.id}'`, (error,results) => {
        return res.json(results);
    });
});

app.post("/authors_sql_injection", (req,res) => {
    let statement = `insert into authors 
    (au_id, au_lname, au_fname, contract )
        values ('${req.body.id}',
                '${req.body.lName}',
                '${req.body.fName}',
                 ${req.body.contract});`
    connection.query(statement);
    res.status(201).json({message: "Created new author"});
})

// post request using a parameterised query
app.post("/authors", (req,res) => {
    const {id, lName, fName, contract} = req.body;
    let statement = `insert into authors 
    (au_id, au_lname, au_fname, contract )
        values (?,?,?,?);`
    connection.query(statement, [id,lName, fName,contract], (error, result) => {
        res.status(201).json({message: "Created new author"});
    } );


});



app.listen(port, () => {
    console.log("server is running on port " + port);
});