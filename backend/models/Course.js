const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

let courseSchema = mongoose.Schema({
  name: String,
  description: String,
  period: String,
  assignedTo: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  }],
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});
const course = mongoose.model("Course", courseSchema);
courseSchema.plugin(uniqueValidator);
//export user
module.exports = course;