const { model, Schema } = require('mongoose');

const desctopicSchema = new Schema({
    desc_id: {
        type: Schema.Types.ObjectId,
        ref: "Description"
    },
    topic_id: {
        type: Schema.Types.ObjectId, 
        ref: "Topic"
    }
})

module.exports = model("Desctopic", desctopicSchema)