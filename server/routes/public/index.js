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


  // route for logging out
  app.get('/logout', function (req, res) {
    req.logout();
    res.redirect('/');
  });


// AUTHENTICATE (FIRST LOGIN) 

  // locally
  // process the login form
  app.post('/login', passport.authenticate('local-login'),function(req, res) {
    console.log(req.user);
    res.status(200).json({
      status: 'logged',
      user: req.user
    });
    });
  
  // SIGNUP
  // process the signup form
  app.post('/signup', passport.authenticate('local-signup'), function (req, res) {
    res.status(200).json({
      status: 'created',
      user: req.user
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
};