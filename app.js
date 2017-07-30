var express = require("express");
var path = require("path");
var fs = require("fs");

var app = express();

app.use(function(req, res, next) {
  console.log("Request IP: " + req.url);
  console.log("Request date: " + new Date());
  next();
});

app.use(function(req, res, next) {

  console.log("__dirname: ", __dirname);
  console.log("req.url: ", req.url);

  var filePath = path.join(__dirname, "static", req.url);

  console.log("filePath: ", filePath);

  fs.stat(filePath, function(err, fileInfo) {

    if (err) {
      next();
      return;
    }
    if (fileInfo.isFile()) {
      res.sendFile(filePath);
    } else {
      next();
    }
  });
});

app.listen(3030, function() {
console.log("App started on port 3030");
});