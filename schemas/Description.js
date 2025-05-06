const {Schema,model} = require('mongoose')

const descSchema = new Schema({
    category_id: {
        type: Schema.Types.ObjectId,
        ref: "Category"
    },
    description: {
        type: String,
        required: true,
    },
  },
  {versionKey: false}
)

module.exports = model("Description", descSchema)