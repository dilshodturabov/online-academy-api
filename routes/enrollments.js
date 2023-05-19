const express = require('express');
const router = express.Router();
const {Enrollment, validate} = require('../models/enrollment');
const {Customer} = require('../models/customer');
const {Course} =require('../models/course');

const ERROR_MESSAGE = "Berilgan IDga teng bo`lgan enrollment topilmadi!";
const ERROR_MESSAGE_CUSTOMER = "Berilgan IDga teng bo`lgan mijoz topilmadi!";
const ERROR_MESSAGE_COURSE = "Berilgan IDga teng bo`lgan kategoriya topilmadi!";



router.get('/', async (req,res)=>{
	const enrollment = await Enrollment.find().sort('-dateStart');
	res.send(enrollment);
});

router.get('/:Id', async (req,res)=>{
	const enrollment = await Enrollment.findById(req.params.Id);
	if(!enrollment)
		res.status(404).send(ERROR_MESSAGE);

	res.send(enrollment);
});

router.post('/', async (req,res)=>{
	try{
	const {error} = validate(req.body);
	if(error)
		res.status(400).send(error.details[0].message);

	const customer = await Customer.findById(req.body.customerId);
	if(!customer)
		res.status(404).send(ERROR_MESSAGE_CUSTOMER);

	const course = await Course.findById(req.body.courseId);
	if(!Course)
		res.status(404).send(ERROR_MESSAGE_COURSE);

	let enrollment = new Enrollment({
		customer:{
			name: customer.name,
			_id: customer._id
		},
		course: {
			title: course.title,
			_id: course._id
		},
		courseFee: course.fee
	});
	if(customer.isVip)
		enrollment.courseFee = course.fee - (0.2 * course.fee); //vip mijozlarga 20% chegirma qilindi!

	enrollment = await enrollment.save();

	customer.bonusPoint++;
	customer.save();

	console.log('new enrollment saved!');
	res.send(enrollment);
} catch(err){
	res.status(500).send("server error");
}
});

module.exports = router;