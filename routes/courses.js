const express = require('express');
const router = express.Router();
const {Course, validate} = require('../models/course');
const {Category} = require('../models/category');

const ERROR_MESSAGE = "Berilgan IDga teng bo`lgan kurs topilmadi!";
const ERROR_MESSAGE_C = "Berilgan IDga teng bo`lgan toifa topilmadi!";

router.get('/', async (req, res)=>{ 
	const courses = await Course.find().sort('title');

	res.send(courses);
});

router.get('/:Id', async (req,res)=>{
	const courses = await Course.findById(req.params.Id);
	if(!Courses)
		res.status(404).send(ERROR_MESSAGE);

	res.send(courses);
});

router.post('/', async (req,res)=>{
	const {error} = validate(req.body);
	if (error) 
		res.status(400).send(error.details[0].message);

	const category = await Category.findById(req.body.categoryId);
	if(!category)
		res.status(404).send(ERROR_MESSAGE_C);

	let course = new Course({
		title: req.body.title,
		category:{
			_id: category._id,
			name: category.name
		},
		tags: req.body.tags,
		trainer: req.body.trainer,
		status: req.body.status,
		fee: req.body.fee
	});

	course = await course.save();

	console.log("new course -> ", course);
	res.status(201).send(course);	
});

router.put('/:Id', async (req,res)=>{
	const {error}=validate(req.body);
	if(error)
		res.status(400).send(error.details[0].message);

	const category = await Category.findById(req.body.categoryId);
	if(!category)
		res.status(404).send(ERROR_MESSAGE_C);

	const course = await Course.findByIdAndUpdate(req.params.Id, {
		category: {
			_id: category._id,
			nam: category.name
		},
		title: req.body.title,
		tags: req.body.tags,
		trainer: req.body.trainer,
		status: req.body.status
	},{new: true});

	if(!course)
		res.status(404).send(ERROR_MESSAGE);
	console.log('course updated!')
	res.send(course);
});

router.delete('/:Id', async (req,res)=>{
	const course = await Course.findByIdAndRemove(req.params.Id);
	if(!course)
		res.status(404).send(ERROR_MESSAGE);

	console.log('course deleted!');
	res.send(course);
});


module.exports = router;