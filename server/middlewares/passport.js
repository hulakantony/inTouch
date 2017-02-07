// load all the things we need
var LocalStrategy = require('passport-local').Strategy;
// load up the user model
var User = require('../models/user');

module.exports = function (passport) {

  // used to serialize the user for the session
  passport.serializeUser(function (user, done) {
    done(null, user.id);
  });

  // used to deserialize the user
  passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
      done(err, user);
    });
  });

  // LOCAL LOGIN
  passport.use('local-login', new LocalStrategy({
      // by default, local strategy uses username and password, we will override with email
      usernameField: 'email',
      passwordField: 'password',
      passReqToCallback: true // allows us to pass in the req from our route (lets us check if a user is logged in or not)
    },
    function (req, email, password, done) {
      console.log(email);
      if (email) {
        email = email.toLowerCase(); // Use lower-case e-mails to avoid case-sensitive e-mail matching;
      }
      console.log('EMAIL',email);
      User.findOneAndUpdate({'local.email': email}, {
        "$set": {
          "local.active": true,
          "local.lastActive": Date.now()
        }
      }, function (err, user) {
        // if there are any errors, return the error
        if (err) {
          return done({message: err});
        }
        // if no user is found, return the message
        if (!user) {
          return done({message: 'Sorry. No such a user found!', status: 405}, false);
        }
        if (!user.validPassword(password))
          return done({message: 'Oops! Wrong password.', status: 401}, false);
        // all is well, return user
        else {
          // if user is found and password is right
          return done(null, user);
        }
      });
    }));

  // LOCAL SIGNUP
  passport.use('local-signup', new LocalStrategy({
      // by default, local strategy uses username and password, we will override with email
      usernameField: 'email',
      passwordField: 'password',
      passReqToCallback: true // allows us to pass in the req from our route (lets us check if a user is logged in or not)
    },
    function (req, email, password, done) {
      if (email)
        email = email.toLowerCase();

        // if the user is not already logged in:
        if (!req.user) {
          User.findOne({'local.email': email}, function (err, user) {
            // if there are any errors, return the error
            if (err){
              return done({message: err});
            }
            // check to see if theres already a user with that email
            if (user) {
              return done({message: 'That email is already taken.', status:401}, false);
            } else {
              // create the user
              var newUser = new User();

              newUser.local.email = email;
              newUser.local.password = newUser.generateHash(password);
              newUser.local.nickname = req.body.nickname;

              newUser.save(function (err) {
                if (err){
                  return done({message:err, status: 401});
                }
                return done(null, newUser);
              });
            }
          })
        }
    }));
};