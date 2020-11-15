const handleSignin = (req, res, db, bcrypt) => {
	// declare request variables
	const { email, password } = req.body;
	// check if both exist
	if (!email || !password) {
		return res.status(400).json('incorrect form submission');
	}
	// find email and hashed password in database
	db.select('email', 'hash').from('login')
		.where('email', '=', email)
		.then(data => {
			const isValid = bcrypt.compareSync(password, data[0].hash);
			// if email and password are found, return user's data
			if (isValid) {
				return db.select('*').from('users')
				.where('email', '=', email)
				.then(user => {
					res.json(user[0])
				})
				.catch(err => res.status(400).json('unable to get user'))
			} else{
				res.status(400).json('wrong credentials')
			}
		})
		.catch(err => res.status(400).json('wrong credentials'))
}

module.exports = {
	handleSignin: handleSignin
}