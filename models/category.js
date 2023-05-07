const mongoose = require('mongoose');
const Joi = require('joi');

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required:true,
        minlength: 3,
        maxlength: 100
    }
}, {collection: "categories"});

const Category = mongoose.model('Category', categorySchema);

function validateCategories(category){
    const categorySchema = Joi.object({
        name: Joi.string().min(3).required()
    });

    return categorySchema.validate(category);
}

exports.Category = Category;
exports.validate = validateCategories;
exports.categorySchema = categorySchema;