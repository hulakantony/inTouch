'use strict';
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport');
const morgan = require('morgan');
const flash = require('flash');
const cors = require('cors');
const mongoose = require('mongoose');
const configDB = require('./config/database.js');
const checkTocken = require('./middlewares/checkToken');
const app = express();
const Grid = require("gridfs-stream");
let gfs;
Grid.mongo = mongoose.mongo;
mongoose.Promise = global.Promise;
mongoose.connect(configDB.url); // connect to our database

const  conn = mongoose.connection;
conn.once("open", function(){
    gfs = Grid(conn.db);
    require('./config/passport')(passport, gfs); // pass passport for configuration
    require('./routes/api')(app, gfs);
});



app.use(cors());
// set up  express application
app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser.json()); // get information from html forms
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));

//set up passport
app.use(session({secret: 'ilovescotchscotchyscotchscotch'})); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session



const staticAssetsPath = path.resolve(__dirname, 'static');
app.use(express.static(staticAssetsPath));

//import routes
//public routes..
require('./routes/public/')(app, passport, gfs);

//app.use(checkTocken);

module.exports = app;
