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


app.use(express.static(__dirname+'/ConfigFile'));
controller(app)
if (process.env.NODE_ENV === 'production') {
  console.log("object+"+ express.static('Dashboard/build'))
  app.use(express.static('Dashboard/build'));
  console.log("sssssssaaaaaaaaa"+path.resolve(__dirname, 'Dashboard', 'build','index.html'))
  
  app.get('*', function (req, res) {
    console.log("ssssssssssss"+path.resolve(__dirname, 'Dashboard', 'build','index.html'))
    res.sendFile(path.resolve(__dirname, 'Dashboard', 'build','index.html'));
   
  });
}

module.exports = app;
