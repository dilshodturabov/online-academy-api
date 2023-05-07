const mongoose = require('mongoose');
const Joi = require('joi');

const customerSchema = new mongoose.Schema({
    name: {
    type: String,
    required:true,
    minlength: 3,
    maxlength: 100
    },
    isVip:{
        type: Boolean,
        default: false
    },
    phone:{
        type:Number,
        required:true,
        minlength: 5,
        maxlength: 50
    },
    bonusPoint:{
        type: Number,
        default: 0
    }
});

const Customer = mongoose.model('Customer', customerSchema);

function validateCustomer(category){
    const customerSchema = Joi.object({
        name: Joi.string().min(3).max(50).required(),
        phone: Joi.string().min(5).max(50).required(),
        isVip: Joi.boolean(),
        bonusPoint: Joi.number()
    });

    return customerSchema.validate(category);
}

exports.Customer = Customer;
exports.validate = validateCustomer;
exports.customerSchema = customerSchema;