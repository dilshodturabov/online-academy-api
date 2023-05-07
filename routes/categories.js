const express = require('express');
const router = express.Router();
const {Category, validate} = require('../models/category');

const ERROR_MESSAGE = 'Berilgan IDga teng bo`lgan kategoriya topilmadi!'

router.get('/', async (req,res)=>{
    const category = await Category.find();
    console.log(category);
  
    res.send(category);
});

router.post('/', async (req,res)=>{
    const {error} = validate(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    let category = new Category({name: req.body.name});
    category = await category.save();

    console.log("created category ", category);
    res.status(201).send(category);
});

router.get('/:Id', async (req, res)=>{
    const category = await Category.findById(req.params.Id);
    if(!category)
        return res.status(404).send(ERROR_MESSAGE);

    res.send(category);
});


router.put('/:Id', async (req,res)=>{
    const {error} = validate(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    } 

    const category = await Category.findByIdAndUpdate(req.params.Id, {name: req.body.name},{
        new: true
    });   
    if(!category)
        return res.status(404).send(ERROR_MESSAGE);

    
    console.log("updated category ", category);
    res.send(category);
});

router.delete('/:Id', async (req,res)=>{
    const category = await Category.findByIdAndRemove(req.params.Id);   
    if(!category)
        return res.status(404).send(ERROR_MESSAGE);
    
    console.log("deleted category", category);
    res.send(category);
});

module.exports = router;