import express from 'express';
import bodyParser from 'body-parser'
import mysql from 'mysql'

//set up and configure express
const app = express();
app.use(bodyParser.json());

//set up and intialize the database connection
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "c0nygre",
  database: "albums"
});


//methods to handle requests to different endpoints
app.get("/albums", (req,res) => {
  connection.query("SELECT * FROM albums", 
    (error,
    results,
    fields) => {
      res.json(results);
    });
});

app.get('/albums/:id', (req, res) => {
  connection.query(`SELECT * FROM albums where id = ${req.params.id}`, 
    (error,
    results,
    fields) => {
      res.json(results[0]);
    });
});

app.delete('/albums/:id', (req, res) => {
    connection.query(`DELETE FROM albums where id = ${req.params.id}`, 
    (error,
    results,
    fields) => {
      res.end("item deleted if it exists");
    });
});


app.post("/albums", (req, res) => {
  let sql = "INSERT INTO albums(title,artist,price,tracks)";
  sql += `VALUES ('${req.body.title}','${req.body.artist}',${req.body.price},${req.body.tracks})`
  connection.query(sql, function(error, results, fields) {
    res.end("added new item");
  });
});

app.put("/albums/:id", (req,res) => {
  let sql = `UPDATE albums set title = '${req.body.title}',artist = ${req.body.artist} ,`;
  sql += `price = ${req.body.price},tracks = ${req.body.tracks}) where id = ${req.params.id}`;
  connection.query(sql, function(error, results, fields) {
    res.end("item updated if it exists");
  });
})

//start the server
app.listen(8081, () => { 
   console.log("Server is running.");	
});
