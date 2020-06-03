var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');

var usersRouter = require('./routes/users');
var uploadfileRouter = require('./routes/uploadfile');
var uploadfilePhotoRouter = require('./routes/uploaduserphoto');
var app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());


var controller = require('./Controller/todoController.js')

app.use('/users', usersRouter);
app.use('/uploadfile', uploadfileRouter);
app.use('/uploaduserphoto', uploadfilePhotoRouter);
controller(app)

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('Dashboard/build'));
  app.get('*', function (req, res) {
    res.sendFile(path.resolve(__dirname, 'Dashboard', 'build','index.html'));
   
  });
}

module.exports = app;
