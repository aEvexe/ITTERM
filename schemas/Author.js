const { model, Schema } = require('mongoose');

const authorSchema = new Schema({
    first_name: {
        type: String,
        trim: true,
        required: true,
    },
    last_name: {
        type: String,
        trim: true,
        required: true,
    },
    nick_name: {
        type: String,
        trim: true,
        unique: true,
    },
    email: {
        type: String,
        trim: true,
        unique: true,
        required: true,
    },
    phone: {
        type: String,
        trim: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    info: {
        type: String,
    },
    position: {
        type: String,
    },
    photo: {
        type: String,
        default: '/author/avatar.png',  
    },
    is_expert: {
        type: Boolean,
        default: false,
    },
    is_active: {
        type: Boolean,
        default: false,
    },
    gender: {
        type: String,
        enum: ['erkak', 'ayol'],
    },
    birth_date: {
        type: Date,
        max: '2000-11-11',
    },
    birth_year: {
        type: Number,
        min: 2000,
        max: 2020,
    },
    refresh_token:{
        type: String,
    },
    activation_link:{
        type: String
    }
});
 
module.exports = model("Author", authorSchema);
