module.exports = function(req, res, next) {
	var token;

	if (req.headers && req.headers.authorization) {
		var parts = req.headers.authorization.split(' ');
		if (parts.length == 2) {
			var scheme = parts[0],
				credentials = parts[1];

			if (/^Token$/i.test(scheme)) {
				token = credentials;
			}
		} else {
			return res.json(401, {
				err: 'Format is Authorization: Token [token]'
			});
		}
	} else if (req.param('token')) {
		token = req.param('token');
		delete req.query.token;
	} else {
		return res.json(401, {
			detail: 'No Authorization header was found.'
		});
	}

	async.waterfall([
		function(clb) {
			User
				.findOne({
					token: token
				})
				.populate('user_pictures')
				.exec(clb);
		}, function(user, clb) {
			if(!user) return clb(new Error('Invalid Token'));
			// ... 
			clb(null, user);
		}], function(err, user) {
		  if (err) return res.status(401).send(err.message); // Write global error handler

		  req.user = user;
		  next();
	  })
   
};