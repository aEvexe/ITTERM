const Joi = require('joi');
const mongoose = require('mongoose');

const userValidation = (data) => {
    const schema = Joi.object({
        name: Joi.string()
            .trim()
            .min(2)
            .max(50)
            .required(),

        email: Joi.string().email().lowercase().required().messages({
            'string.base': 'Email must be a string.',
            'string.email': 'Please provide a valid email address.',
            'any.required': 'Email is required.'
        }),
        phone: Joi.string().pattern(/^\d{2}-\d{3}-\d{2}-\d{2}$/).optional().messages({
            'string.pattern.base': 'Phone number must match the pattern: XX-XXX-XX-XX.'
        }),
        password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")).required().messages({
            'string.base': 'Password must be a string.',
            'string.pattern.base': 'Password must be between 3 and 30 characters and contain only alphanumeric characters.',
            'any.required': 'Password is required.'
        }),
        created_date: Joi.string(),
        updated_date: Joi.string(),
        is_active: Joi.string(),        
    });

    return schema.validate(data, { abortEarly: false });
};

module.exports = userValidation;