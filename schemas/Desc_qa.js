const {model, Schema} = require('mongoose')

const descqaSchema = new Schema({
    qa_id: {
        type: Schema.Types.ObjectId,
        ref: "Question"
    },
    desc_id: {
        type: Schema.Types.ObjectId,
        ref: "Description"
    }
})

module.exports = model("DescQa", descqaSchema)