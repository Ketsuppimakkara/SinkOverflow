require('dotenv').config()
var cors = require('cors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

//Here are router definitions, pointing to files which handle requests.
var usersRouter = require('./routes/api/users');
var loginRouter = require('./routes/api/login');
var registerRouter = require('./routes/api/register');
var postsRouter = require('./routes/api/posts');
var commentsRouter = require('./routes/api/comments');
var postVoteRouter = require('./routes/api/postVote')


var db = require('./database.js');
var app = express();


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());                                                    //Enable cors so React can get data from this API

//Here we bind the routes to the router definitions set above. If you need more routes, add them here as well as in the above list of definitions
app.use('/api/users', usersRouter);
app.use('/api/login', loginRouter);
app.use('/api/register', registerRouter);
app.use('/api/posts', postsRouter);
app.use('/api/comments', commentsRouter);
app.use('/api/postVote', postVoteRouter);
app.use('/public/images', express.static('./public/images'));       //This route handles profile images, not yet implemented

module.exports = app;
