const handleRegister = (req, res, db, bcrypt) => {
	// declare request variable
	const { email, name, password } = req.body;
	// check if all data entered
	if(!email || !name || !password) {
		return res.status(400).json('incorrect form submission')
	}
	// declare the hashed password
	const hash = bcrypt.hashSync(password);
		// enter user input into database 
		db.transaction(trx => {
			// store email and hased password
			trx.insert({
				hash: hash,
				email: email
			})
			.into('login')
			.returning('email')
			.then(loginEmail => {
				// store email, name and date joined
				return trx('users')
					.returning('*')
					.insert({
						email: loginEmail[0],
						name: name,
						joined: new Date()
					})
					// return json'd user info from db
					.then(user => {
						res.json(user[0]);
					})
			})
			.then(trx.commit)
			.catch(trx.rollback)
		})
		.catch(err => res.status(400).json('unable to register'))
}

module.exports = {
	handleRegister: handleRegister
}