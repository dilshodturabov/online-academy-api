const express = require('express');
const router = express.Router();
const {User, validate} = require('../models/user');

router.post('/', async (req, res)=>{
	const {error} = validate(req.body);
	if(error)
		res.status(400).send(error.details[0].message);

	let user = await User.findOne({email: req.body.email});
	if (user) 
		res.status(400).send("Mavjud bo`lgan foydalanuvchi");

	user = new User({
		name: req.body.name, 
		password: req.body.password,
		email: req.body.email
	});

	user = await user.save();

	res.send(user);
});

module.exports = router;
