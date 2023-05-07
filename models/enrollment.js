const mongoose = require('mongoose');
const Joi = require('joi');
const {customerSchema} = require('./customer');
const {courseSchema} = require('./course');

const enrollmentSchema = new mongoose.Schema({
	customer: {
		type: new mongoose.Schema({
			name: {
				type: String,
				minlength: 3,
				maxlength: 255,
				required: true
			}
		}),
		required: true
	},
	course: {
		type: new mongoose.Schema({
			title: {
				type: String,
				minlength: 5,
				maxlength: 255,
				required: true,
				trim: true
			}
		})
	},
	courseFee: {
		type: Number
	},
	dateStart: {
		type: Date,
		required: true,
		default: Date.now
	}
});

const Enrollment = mongoose.model("Enrollment", enrollmentSchema);


function validate(enrollment){
	const enrollmentSchema = Joi.object({
		customerId: Joi.string().required(),
		courseId: Joi.string().required()
	});

	return enrollmentSchema.validate(enrollment);
}

exports.Enrollment = Enrollment;
exports.validate = validate