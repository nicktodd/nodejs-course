var express = require("express");
var bodyParser = require("body-parser");
var cors = require("cors");
var mysql = require("mysql");

var app = express();
app.use(cors());
app.use(bodyParser.json());

var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "c0nygre",
  database: "conygre"
});

app.get("/albums", function(req, res) {
  connection.query("SELECT * FROM compact_discs", function(
    error,
    results,
    fields
  ) {
    res.json(results);
  });
});

app.get("/albums/:id", function(req, res) {
  let sql = "SELECT * FROM compact_discs WHERE id = " + req.params.id;
  connection.query(sql, function(error, results, fields) {
    res.json(results);
  });
});

app.delete("/albums/:id", function(req, res) {
  let sql = "DELETE FROM compact_discs WHERE id = " + req.params.id;
  connection.query(sql, function(error, results, fields) {
    res.end("album removed if it existed");
  });
});

app.post("/albums", function(req, res) {
  let sql = "INSERT INTO compact_discs(title,artist,price,tracks)";
  sql =
    sql +
    " VALUES('" +
    req.body.title +
    "','" +
    req.body.artist +
    "','" +
    req.body.price +
    "','" +
    req.body.tracks +
    "')";
  console.log(sql);
  connection.query(sql, function(error, results, fields) {
    res.end("added new item");
  });
});

var server = app.listen(8081, function() {
  console.log(server.address().address);
  console.log(server.address().port);
});
