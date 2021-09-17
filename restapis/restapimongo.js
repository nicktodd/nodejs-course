var express = require("express");
var bodyParser = require("body-parser");
var cors = require("cors");
var mongo = require("mongoose");
const CompactDisc = require("./compactdisc.model.js");

var app = express();
app.use(cors());
app.use(bodyParser.json());

mongo
  .connect("mongodb://localhost:27017/music", {
    useNewUrlParser: true
  })
  .then(() => {
    console.log("Successfully connected to the database");
  })
  .catch(err => {
    console.log("Could not connect to the database. Exiting now...", err);
    process.exit();
  });

app.get("/music", (req, res) => {
  CompactDisc.find()
    .then(discs => {
      res.send(discs);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving CDs."
      });
    });
});

app.get("/music/:id", function(req, res) {
  CompactDisc.findById(req.params.id)
    .then(cd => {
      if (!cd) {
        return res.status(404).send({
          message: "CD not found with id " + req.params.id
        });
      }
      res.send(cd);
    })
    .catch(err => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "CD not found with id " + req.params.id
        });
      }
      return res.status(500).send({
        message: "Error retrieving CD with id " + req.params.id
      });
    });
});

app.post("/music", function(req, res) {
  let newCD = new CompactDisc({
    title: req.body.title,
    artist: req.body.artist,
    tracks: req.body.tracks,
    price: req.body.price
  });
  newCD
    .save(newCD)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the CD."
      });
    });
});

var server = app.listen(8081, function() {
  console.log(server.address().address);
  console.log(server.address().port);
});
