var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost//*specify the database used HERE*/')

// importing the modules containing the routers  (can also straight awa require as the second argument of app.use())
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var proctorsRouter = require('./routes/api/proctor');
var studentsRouter = require('./routes/api/student');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// initializing logger middele ware used for development  
app.use(logger('dev'));

// body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cookieParser());

//set a static folder
//this folder is the place where the server searches for the index.html file 
// first checks inside the public folder for index.html, if not found uses the route to view engine's index
app.use(express.static(path.join(__dirname, 'public')));

/////////////////////////////////////////////////////////////////////////////////
// insert the routes here
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/api/proctor', proctorsRouter);  // APIs used by the proctor's side UI
app.use('/api/student', studentsRouter);  // APIs used by the students' side UI
/////////////////////////////////////////////////////////////////////////////////

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

module.exports = app;
