'use strict';
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session      = require('express-session');
const passport = require('passport');
const morgan       = require('morgan');
const flash    = require('flash');
const cors = require('cors');
const mongoose = require('mongoose');
const configDB = require('./config/database.js');
const app = express();


mongoose.connect(configDB.url); // connect to our database
require('./config/passport')(passport); // pass passport for configuration

// set up  express application
app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser.json()); // get information from html forms
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

//set up passport
app.use(session({ secret: 'ilovescotchscotchyscotchscotch' })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session


app.use(cors());

const staticAssetsPath = path.resolve(__dirname, 'static');
app.use(express.static(staticAssetsPath));

//import routes
require('./routes/public')(app, passport);
require('./routes/api')(app);

module.exports = app;