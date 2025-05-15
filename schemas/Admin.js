const { boolean } = require('joi')
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
        type: Boolean,
        default: false,
    },
    is_creator: {
        type: Boolean,
        default: false,
    },
    created_date: {
        type: String,
        required: true,
    },

    updated_date: {
        type: String,
        required: true,
    },
    refresh_token: {
        type: String
    },
})

module.exports = model("Admin", adminSchema)