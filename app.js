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
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
controller(app)
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('dashboard/build'));
  app.get('*', function (req, res) {
    res.sendFile(path.resolve(__dirname, 'Dashboard', 'build','index.html'));
   
  });
}
module.exports = app;
