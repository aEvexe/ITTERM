const {Schema,model} = require('mongoose')

const socailSchema = new Schema({
    social_name: {
        type: String,
        required: true,
        trim: true,
    },
    social_icon_file: {
        type: String,
        uppercase: true,
    },
  },
  {versionKey: false}
)

module.exports = model("Social", socailSchema)