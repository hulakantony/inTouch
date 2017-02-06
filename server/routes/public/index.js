var User = require('../../models/user');

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
      passport.authenticate('local-login', function (err, user, info) {
        if (err) {
          return res.status(err.status).send(err.message);
        }
        req.logIn(user, function (err) {
          if (err) {
            res.status(401).send(err);
          }
          res.status(200).json({
            status: 'logged',
            user: user
          });
        });
      })(req, res, next);
    }
  );

  // SIGNUP
  // process the signup form

  app.post('/signup', function (req, res, next) {
      passport.authenticate('local-signup', function (err, user, info) {
        if (err) {
          res.status(err.status).send(err.message);
        }
        req.logIn(user, function (err) {
          if (err) {
            res.status(401).send(err);
          }
          res.status(200).json({
            status: 'created',
            user: user
          });
        });
      })(req, res, next);
    }
  );


  //LOGOUT
  app.get('/logout', userSetActiveToFalse, function (req, res) {
    let user = req.user;
    req.logout();
    res.status(200).json({
      status: 'logged out',
      user: user
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
  function userSetActiveToFalse(req, res, next) {
    let user = req.user;
    if (!user) {
      return next("No active users.");
    }
    User.findOneAndUpdate({'local.email': user.local.email}, {
      "$set": {
        "local.active": false,
        "lastActive": Date.now()
      }
    }, function (err, user) {
      return next();
    })
  }
};