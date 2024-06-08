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
  database: "pubs"
});

app.get("/authors", function(req, res) {
  connection.query("SELECT * FROM authors", function(
    error,
    results,
    fields
  ) {
    console.log(error);
    res.json(results);
  });
});

app.get("/authors/:id", function(req, res) {
  console.log(req.params.id);
  let sql = "SELECT * FROM authors WHERE au_id = '" + req.params.id + "'";
  connection.query(sql, function(error, results, fields) {
    console.log(error);
    res.json(results);
  });
});

app.delete("/authors/:id", function(req, res) {
  let sql = "DELETE FROM authors WHERE au_id = '" + req.params.id + "'";
  connection.query(sql, function(error, results, fields) {
    res.end("album removed if it existed");
  });
});

app.post("/authors", function(req, res) {
  let sql = "INSERT INTO authors(au_id, au_lname,au_fname,phone,address,city,state,zip,contract)";
  sql =
    sql +
    " VALUES('" +
    req.body.id +
    "','" +
    req.body.lname +
    "','" +
    req.body.fname +
    "','" +
    req.body.phone +
    "','" +
    req.body.address +
    "','" +
    req.body.city +
    "','" +
    req.body.state +
    "','" +
    req.body.zip +
    "'," +
    req.body.contract +
    ")";
  console.log(sql);
  connection.query(sql, function(error, results, fields) {
    res.end("added new item");
    console.log(error);
  });
});

var server = app.listen(8081, function() {
  console.log(server.address().address);
  console.log(server.address().port);
});
