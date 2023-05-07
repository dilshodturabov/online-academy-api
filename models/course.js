const mongoose = require('mongoose');
const Joi = require('joi');
const {categorySchema} = require('./category');

const courseSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true,
		minlength: 3,
		maxlength: 50,
		trim: true
	},
	tags: {
		type: [{
			type:String,
		}],
		required: true,
	},
	trainer:{
		type: String,
		minlength: 3,
		maxlength: 50,
		required: true
	},
	status:{
		type: String,
		enum: ["Active", "Inactive"],
		reqired: true,
	},
	category: categorySchema,
	fee: {
		type: Number,
		reqired: true
	}
});

const Course = mongoose.model('Course',courseSchema);


function validateCourse(course){
	const courseSchema = Joi.object({
		categoryId: Joi.string().required(),
		title: Joi.string().required().min(3).max(50),
		tags: Joi.array().required().items(Joi.string()),
		trainer: Joi.string().min(3).max(20).required(),
		status: Joi.string().required(),
		fee: Joi.number().required()
	});
	
	return courseSchema.validate(course);
}

exports.validate = validateCourse;
exports.Course = Course;
exports.courseSchema = courseSchema;