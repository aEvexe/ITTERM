const Joi = require('joi');
const mongoose = require('mongoose');

const categoryValidation = (data) => {
    const schema = Joi.object({
        name: Joi.string()
            .trim()
            .min(2)
            .max(50)
            .required(),

        parent_category_id: Joi.string()
            .optional()
            .custom((value, helpers) => {
                if (!mongoose.Types.ObjectId.isValid(value)) {
                    return helpers.message("Invalid parent_category_id");
                }
                return value;
            }),

        desc: Joi.string()
            .min(5)
            .max(500)
            .required()
    });

    return schema.validate(data, { abortEarly: false });
};

module.exports = categoryValidation;
