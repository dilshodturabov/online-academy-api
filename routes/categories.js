const express = require('express');
const router = express.Router();
const {Category, validate} = require('../models/category');
const auth = require('../middleware/auth'); 
const admin = require('../middleware/admin');

const ERROR_MESSAGE = 'Berilgan IDga teng bo`lgan kategoriya topilmadi!'

router.get('/', async (req,res)=>{
    throw new Error('Toifalarni olishda kutilmagan xato yuz berdi');
    const category = await Category.find();
    console.log(category);
    res.send(category);
});

router.post('/', auth, async (req,res)=>{
    const token = req.header('x-auth-token');
    if(!token){
        return res.status(401).sendStatus('Token bo\'lmaganligi sababli so\'rov rad etildi!');
    }
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


router.put('/:Id', auth, async (req,res)=>{
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

router.delete('/:Id', [auth, admin], async (req,res)=>{
    const category = await Category.findByIdAndRemove(req.params.Id);   
    if(!category)
        return res.status(404).send(ERROR_MESSAGE);
    
    console.log("deleted category", category);
    res.send(category);
});

module.exports = router;