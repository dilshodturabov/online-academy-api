const express = require('express');
const router = express.Router();
const {User, validate} = require('../models/user');
const _ = require('lodash');
const bcrypt = require('bcrypt');
const auth = require('../middleware/auth');

router.get('/me', auth, async (req, res)=>{
	const user = await User.findById(req.user._id).select('-password');
	return res.send(user);
});

router.post('/',  async (req, res)=>{
	const {error} = validate(req.body);
	if(error)
		res.status(400).send(error.details[0].message);

	let user = await User.findOne({email: req.body.email});
	if (user) 
		res.status(400).send("Mavjud bo`lgan foydalanuvchi");

	user = new User(_.pick(req.body, ['name', 'email', 'password', 'isAdmin']));
	const salt = await bcrypt.genSalt(10);
	user.password = await bcrypt.hash(user.password, salt);

	user = await user.save();

	//classic way of hiding passwrod from client side
	// const {name, email} = user;
	// res.send({name, email});

	return res.send(_.pick(user, ['_id', 'name', 'email', 'isAdmin']));
});

module.exports = router;
