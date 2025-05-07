const {Schema,model} = require('mongoose')

const categorySchema = new Schema({
    name: {
        type: String,
        required: false,
        trim: true,
    },
    parent_category_id: {
        type: Schema.Types.ObjectId,
        ref: "Category"
    },
    desc: {
        type: String,
        required: true
    }
  },
  {versionKey: false}, { strictPopulate: false }
)

module.exports = model("Category", categorySchema);