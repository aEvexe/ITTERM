const {model, Schema} = require('mongoose')

const adminSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    phone: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    is_active: {
        type: String,
        required: true,
    },
    is_creator: {
        type: String,
        required: true,
    },
    created_date: {
        type: String,
        required: true,
    },

    updated_date: {
        type: String,
        required: true,
    },

})

module.exports = model("Admin", adminSchema)