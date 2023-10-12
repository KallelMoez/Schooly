//import mongoose
const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

let userSchema = mongoose.Schema({
  firstName: String,
  lastName: String,
  email: { type: String, unique: true },
  pwd: String,
  tel: { type: String, unique: true },
  role: String,
  isConfirmed: Boolean,
  img: String,
  cv: String,
  address: String,
  speciality: String,
  studentTel: String,
  emailConfirmation: { type: Boolean, default: false },
  child: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  studentGrades: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Grade",
    },
  ],
  studentCourses: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
    },
  ],
  teacherGrades: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Grade",
    },
  ],
});

const user = mongoose.model("User", userSchema);
userSchema.plugin(uniqueValidator);
//export user
module.exports = user;
