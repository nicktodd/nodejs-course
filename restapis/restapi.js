var express = require('express');
var bodyParser = require('body-parser');
var fs = require('fs');
var cors = require("cors");
var app = express();
app.use(bodyParser.json());
app.use(cors());

app.get('/albums', function (req, res) {
  fs.readFile(__dirname + '/' + 'albums.json', 'utf8', function (err, data) {
    console.log(data)
    res.end(data)
  })
})

app.get('/albums/:id', function (req, res) {
  fs.readFile(__dirname + '/' + 'albums.json', 'utf8', function (err, data) {
	   var idOfAlbum = req.params.id
	   data = JSON.parse(data)
	   console.log('you requested album ' + idOfAlbum)
	   for (var i = 0; i < data.length; i++) {
      if (data[i].id == idOfAlbum) {
		   		var returnAlbum = data[i]
      }
	   }
    console.log(returnAlbum)
    res.end(JSON.stringify(returnAlbum))
  })
})

app.delete('/albums/:id', function (req, res) {
  fs.readFile(__dirname + '/' + 'albums.json', 'utf8', function (err, data) {
	   var idOfAlbum = req.params.id
	   data = JSON.parse(data)
	   console.log('you requested album ' + idOfAlbum)
	   for (var i = 0; i < data.length; i++) {
      if (data[i].id == idOfAlbum) {
		   		data.splice(i, 1)
      }
	   }
    fs.writeFile(__dirname + '/' + 'albums.json',
      JSON.stringify(data), function
      (err) {
        if (err) { return console.log(err) }
      })
   		})
  res.end('album removed if it existed')
})

app.post('/albums', function (req, res) {
  // parses the request url

  var newAlbum = req.body
  fs.readFile(__dirname + '/' + 'albums.json', 'utf8', 		function (err, data) {
		   data = JSON.parse(data)
		   data.push(newAlbum)
		   res.end(JSON.stringify(data))
		   fs.writeFile(__dirname + '/' + 'albums.json',
      JSON.stringify(data), function
      (err) {
        if (err) { return console.log(err) }
      })
   		})
})

app.put('/albums', function (req, res) {
  var updatedAlbum = req.body
  fs.readFile(__dirname + '/' + 'albums.json', 'utf8',
		   function (err, data) {
		   data = JSON.parse(data)
		   for (var i = 0; i < data.length; i++) {
        if (data[i].id == updatedAlbum.id) {
		   		data[i] = updatedAlbum
        }
	   }
		   res.end(JSON.stringify(data))
		   fs.writeFile(__dirname + '/' + 'albums.json',
        JSON.stringify(data), function
        (err) {
          if (err) { return console.log(err) }
        })
   		})
  res.end('album updated if it existed')
})

var server = app.listen(8081, function () {
  var host = server.address().address
  var port = server.address().port
})
