const Joi = require('joi');
const mongoose = require('mongoose');

const descValidation = (data) => {
    const schema = Joi.object({
        category_id: Joi.string()
            .custom((value, helpers) => {
                if (!mongoose.Types.ObjectId.isValid(value)) {
                    return helpers.message("Invalid category_id format");
                }
                return value;
            })
            .required(),

        description: Joi.string()
            .min(5)
            .max(1000)
            .required()
    });

    return schema.validate(data, { abortEarly: false });
};

module.exports = descValidation;
