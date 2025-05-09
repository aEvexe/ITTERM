const {model, Schema} = require('mongoose')

const questionSchema = new Schema({
    question: {
        type: String,
        required: true
    },
    answer: {
        type: String,
        required: true,
        unique: true,
    },
    created_date: {
        type: String,
        required: true,
    },
    updated_date: {
        type: String,
        required: true,
    },
    is_checked: {
        type: String,
        required: true,
    },
    user_id: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    expert_id: {
        type: Schema.Types.ObjectId,
        ref: "Author"
    }

})

module.exports = model("Question", questionSchema)