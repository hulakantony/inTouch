/**
 * Created by kate on 02/02/17.
 */
'use strict';
const User = require('../../models/user');

module.exports = function (app, gfs) {
  // route for getting users. ?active=true will return only active users 
  //TODO Make private route

  app.get('/users', function (req, res) {
    let base = req.query.active;
    let where;
    if(base == 'true'){
      where = {$where: "this.local.loggedCount > 0"}
    }
    if(base == 'false'){
      where = {$where: "this.local.loggedCount <= 0"}
    }
    User.find(where, function (err, users) {
      if (err) throw err;
      res.json(users)
    })
  });

 

  // sends the image
  app.get('/users/photo/:filename', function(req, res){
    var readstream = gfs.createReadStream({filename: req.params.filename});
    readstream.on("error", function(err){
      res.send("No image found with that title");
    });
    readstream.pipe(res);
  });


};