const UserModel = require('../../../models/user.js')

module.exports = function(req, res) {
	const name = req.body.nickname;
	const pass = req.body.password;
	const email = req.body.email;
	const avatar = req.body.avatar;
	UserModel.findOne({
		'local.name': name,
		'local.email': email
	}, function(err, user) {
		if(err) throw err;
		if(!user) {
			var user = new UserModel({ 
				nickname: name, 
				password: pass,
				email: email,
				avatar: avatar	
			});	
			user.save(function(err) {
				if (err) throw err;

				console.log('User saved successfully');
				res.json({ success: true, message: 'User saved successfully' })					
			});
		} else {
			res.json({ success: false, message: 'Username has already been used' });				
		}	
	})			
}

