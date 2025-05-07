const Joi = require('joi');

const socialValidation = (data) => {
    const schema = Joi.object({
        social_name: Joi.string()
            .trim()
            .min(2)
            .max(50)
            .required(),

        social_icon_file: Joi.string()
            .uppercase()
            .optional()
    });

    return schema.validate(data, { abortEarly: false });
};

module.exports = socialValidation;
