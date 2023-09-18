const express = require('express');
const router = express.Router();
const {Customer, validate} = require('../models/customer');
const auth = require('../middleware/auth');

const ERROR_MESSAGE = "Berilgan IDga teng bo`lgan mijoz topilmadi!";

router.get('/', async (req,res)=>{
    const customer = await Customer.find();
    console.log(customer);
  
    res.send(customer);
});

router.post('/', auth, async (req,res)=>{
    const {error} = validate(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    let customer = new Customer({
        name: req.body.name,
        isVip: req.body.isVip,
        phone: req.body.phone,
        bonusPoint: req.body.bonusPoint
    });
    customer = await customer.save();

    console.log("created customer ", customer);
    return res.status(201).send(customer);
});

router.get('/:Id', async (req, res)=>{
    const customer = await Customer.findById(req.params.Id);
    if(!customer)
        return res.status(404).send(ERROR_MESSAGE);

    return res.send(customer);
});

router.put('/:Id', auth, async (req,res)=>{
    const {error} = validate(req.body);
    if(error)
        res.status(400).send(error.details[0].message);

    let customer = await Customer.findByIdAndUpdate(req.params.Id, {
        name: req.body.name,
        isVip: req.body.isVip,
        phone: req.body.phone,
        bonusPoint: req.body.bonusPoint
    }, {new: true});

    if(!customer)
        res.status(404).send(ERROR_MESSAGE);

    console.log('updated customer ',customer);
    return res.send(customer);
});

router.delete('/:Id', auth, async (req,res)=>{
    const customer = await Customer.findByIdAndRemove(req.params.Id);
    if(!customer)
        res.status(404).send(ERROR_MESSAGE);

    console.log("deleted customer ",customer);
    return res.send(customer);
});

module.exports = router;