const {model, Schema} = require('mongoose')

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    info: {
        type: String,
        required: true,
    },
    photo: {
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
    is_active: {
        type: String,
        required: true,
    },

})

module.exports = model("User", userSchema)