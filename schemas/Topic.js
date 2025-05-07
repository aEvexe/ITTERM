const {Schema,model} = require('mongoose')

const topicSchema = new Schema({
    author_id: {
        type: Schema.Types.ObjectId,
        ref: "Author"
    },
    topic_like: {
        type: String,
        required: true
    },
    topic_text: {
        type: String,
        required: true
    },
    created_date: {
        type: String,
        required: true
    },
    updated_date: {
        type: String,
        required: true
    },
    is_checked: {
        type: String,
        required: true
    },
    is_approved: {
        type: String,
        required: true
    },
  },
    {versionKey: false}
)

module.exports = model("Topic", topicSchema)