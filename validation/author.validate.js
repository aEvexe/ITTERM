const Joi = require('joi');

const authorFullName = (parent) => {
    return parent.first_name + " " + parent.last_name;
}

exports.authorValidation = (body) => {
    const schema = Joi.object({
        first_name: Joi.string().required().messages({
            'any.required': 'First name is required.',
            'string.base': 'First name must be a string.'
        }),
        last_name: Joi.string().required().messages({
            'any.required': 'Last name is required.',
            'string.base': 'Last name must be a string.'
        }),
        full_name: Joi.string().default(authorFullName).messages({
            'string.base': 'Full name must be a string.'
        }),
        nick_name: Joi.string()
            .min(3).max(15)
            .messages({
                'string.base': 'Nick name must be a string.',
                'string.min': 'Nick name is too short.',
                'string.max': 'Nick name is too long.'
            }),
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
        confirm_password: Joi.any().valid(Joi.ref('password')).required().messages({
            'any.only': 'Confirm password must match the password.',
            'any.required': 'Confirm password is required.'
        }),
        info: Joi.string().optional(),
        position: Joi.string().optional(),
        photo: Joi.string().default('/author/avatar.png'),
        is_expert: Joi.boolean().default(false),
        is_active: Joi.boolean().default(false),
        gender: Joi.string().valid("erkak", "ayol").optional(),
        birth_date: Joi.date().max('2000-11-11').optional().messages({
            'date.base': 'Birth date must be a valid date.',
            'date.max': 'Birth date must not be after 2000-11-11.'
        }),
        port: Joi.number().port().optional().messages({
            'number.base': 'Port must be a number.',
            'number.port': 'Port must be a valid port number.'
        }),
        birth_year: Joi.number().integer().max(2020).min(2000).optional().messages({
            'number.base': 'Birth year must be a valid year.',
            'number.integer': 'Birth year must be an integer.',
            'number.min': 'Birth year must be no earlier than 2000.',
            'number.max': 'Birth year must be no later than 2020.'
        }),
        referred: Joi.boolean().optional(),
        referredDetails: Joi.string().when('referred', {
            is: true,
            then: Joi.string().required().messages({
                'any.required': 'Referred details are required when referred is true.'
            }),
            otherwise: Joi.string().optional()
        }),
        colors: Joi.array().items(Joi.string(), Joi.number()).optional(),
        is_yes: Joi.boolean().truthy('Yes', 'Ha').valid(true).optional()
    });

    return schema.validate(body, { abortEarly: false });
}
