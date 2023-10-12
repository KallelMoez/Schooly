//import mongoose
const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

let gradeSchema = mongoose.Schema({
  note: Number,
  evaluation: String,
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
  },
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },

  teacherId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

const grade = mongoose.model("Grade", gradeSchema);
gradeSchema.plugin(uniqueValidator);
//export grade
module.exports = grade;
