const mongoose = require('mongoose');
const Joi = require('joi');

const userSchema = new mongoose.Schema({
	name: {
		type: String,
		minlength: 3,
		maxlength: 50,
		required: true
	},
	password: {
		type: String,
		required: true,
		minlength: 3,
		maxlength: 1021
	},
	email: {
		type: String,
		required: true,
		minlength: 5,
		maxlength: 250,	
		unique: true
	}
});

const User = mongoose.model('User', userSchema);

function validateUser(user){
	const userSchema = Joi.object({
		name: Joi.string().min(3).max(50).required(),
		password: Joi.string().min(3).max(50).required(),
    	email: Joi.string().email().required()
	})

	return userSchema.validate(user);
}


exports.User = User; 
exports.validate = validateUser;