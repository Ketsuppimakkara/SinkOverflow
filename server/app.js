require('dotenv').config()
var cors = require('cors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var usersRouter = require('./routes/api/users');
var loginRouter = require('./routes/api/login');
var registerRouter = require('./routes/api/register');
var postsRouter = require('./routes/api/posts');
var commentsRouter = require('./routes/api/comments');


var db = require('./database.js');
var app = express();


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());                                                    //Enable cors

app.use('/api/users', usersRouter);
app.use('/api/login', loginRouter);
app.use('/api/register', registerRouter);
app.use('/api/posts', postsRouter);
app.use('/api/comments', commentsRouter);
app.use('/public/images', express.static('./public/images'));       //This route handles profile images

module.exports = app;
