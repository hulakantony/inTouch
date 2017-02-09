const User = require('../../models/user');
const jwt = require('jsonwebtoken');
const jwtConfig = require('../../config/jwtConfig');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });



module.exports = function (app, passport) {

  // route for home page
  app.get('/', function (req, res) {
    res.send({message: 'Welcome to fabulous inTouch CHAT'}); // load the index.ejs file
  });

  // route for showing the profile page
  app.get('/profile', isLoggedIn, function (req, res) {
    res.status(200).json({
      page: 'profile',
      status: 'logged',
      user: req.user
    })
  });

// AUTHENTICATE (FIRST LOGIN)
  // locally
  // process the login form

  app.post('/login', function (req, res, next) {
      passport.authenticate('local-login', {session: true}, function (err, user, info) {
        if (err) {
          return res.status(err.status).json(err);
        }
        req.logIn(user, function (err) {
          if (err) {
            return res.status(401).json({message: err});
          }
          // create a token if everything all right
          var token = jwt.sign({username: user.email, password: user.password}, jwtConfig.secretKey);
          // return the information including token as JSON*/
          console.log(user);
          res.status(200).json({
            status: 'logged',
            user: user,
            token: token
          });
        });
      })(req, res, next);
    }
  );

  // SIGNUP
  // process the signup form
  
  app.post('/signup',  upload.single("photo"), function (req, res, next) {
    passport.authenticate('local-signup', {session: false}, function (err, user, info) {
        if (err) {
          return res.status(err.status).json(err);
        }
          res.status(200).json({
            status: 'created',
            user: user
        });
      })(req, res, next);
    }
  );

  //LOGOUT
  app.get('/logout', function (req, res) {
    req.logout();
    res.status(200).json({
      status: 'logged out'
    });
  });

// route middleware to make sure a user is logged in
  function isLoggedIn(req, res, next) {
    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
      return next();
    // if they aren't redirect them to the home page
    res.redirect('/');
  }

  // route middleware to make set active state to false before logged out
  // function userSetActiveToFalse(req, res, next) {
  //   let user = req.body.user;
  //   if (!user) {
  //     res.status(401).json({
  //       message: "No active users."
  //     });
  //     return;
  //   }
  //   User.findOneAndUpdate({'local.nickname': user}, {
  //     "$set": {
  //       "local.active": false,
  //       "lastActive": Date.now()
  //     }
  //   }, function (err, user) {
  //     return next();
  //   })
  // }
};
 