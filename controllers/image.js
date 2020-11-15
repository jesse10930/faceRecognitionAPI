// declare clarifai
const Clarifai = require('clarifai');

// declare app with clarifai api key
const app = new Clarifai.App({
 apiKey: '1d69b6d7133646bfb33b11b014fe9dcd'
});

// declare clarifai api call, find faces, return json'd data
const handleApicall = (req, res) => {
	app.models
		.predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
		.then(data => {
			res.json(data)
		})
		.catch(err => res.status(400).json('unable to work with API'))
}

// increase rank of user
const handleImage = (req, res, db) => {
	// declare request variable
	const { id } = req.body;
	// find user in database, increase entries by 1, return json'd entries data
	db('users').where('id', '=', id)
	.increment('entries', 1)
	.returning('entries')
	.then(entries => {
		res.json(entries[0]);
	})
	.catch(err => res.status(400).json('unable to get entries'))
}

module.exports = {
	handleImage: handleImage,
	handleApicall: handleApicall
}