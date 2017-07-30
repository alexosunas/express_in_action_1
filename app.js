var express = require("express");
var morgan = require("morgan");
var path = require("path");
var fs = require("fs");

var app = express();

var chokidar = require('chokidar');
var watcher = chokidar.watch('./')

watcher.on('ready', function() {
  watcher.on('all', function() {
    console.log("Clearing /dist/ module cache from server")
    Object.keys(require.cache).forEach(function(id) {
      console.log('id', id);

      // console.log('?? : ', /[\/\\]app[\/\\]/.test(id));

      // tried to make it work to listen also for app.js file, however it did not work :(
       console.log('??2 : ', /[\/\\]/.test(id));
      //console.log('??3 : ', /[\/\\]app[\/\\]/);

      // if (/[\/\\]app[\/\\]/.test(id)) delete require.cache[id]
      if (/[\/\\]/.test(id)) delete require.cache[id]
    })
  })
})

app.use(morgan("combined"));

app.use(function(req, res, next) {
  console.log('tu mama8');
  console.log("Request IP: ", req.headers['x-forwarded-for']);
  console.log("Request IP: ", req.connection.remoteAddress);
  console.log("Request date: ", new Date());
  next();
});

var staticPath = path.join(__dirname, "static");
app.use(express.static(staticPath));

app.use(function (req, res, next) {
  require('./controllers/index')(req, res, next);
})

app.use(function(req, res) {
  res.status(404);
  res.send("File not found!");
});

app.listen(3030, function() {
console.log("App started on port 3030");
});