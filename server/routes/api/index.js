/**
 * Created by kate on 02/02/17.
 */
'use strict';
const User = require('../../models/user');

module.exports = function (app) {
  // route for getting users. ?active=true will return only active users 
  //TODO Retrun actuve users
  //TODO Make private route
  
  app.get('/users', function (req, res) {
    let base = req.query.active;
    let where = base == {} ? {active: true} : {};
    User.find({}, function (err, users) {
      if (err) throw err;
      res.json(users)
    })
  });
};