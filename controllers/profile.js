const handleProfileGet = (req, res, db) => {
	// declare request variables
	const { id } = req.params;
	// get user info from database, searching by id
	db.select('*').from('users').where({id})
		.then(user => {
			// if user exists, return json'd data
			if (user.length) {
				res.json(user[0])
			} else {
				res.status(400).json('Not found')
			}
		})
		.catch(err => res.status(400).json('Error getting user'))
}

module.exports = {
	handleProfileGet: handleProfileGet
}