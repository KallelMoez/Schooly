// -----------------------------------------Import Section------------------------------------
// ----------import express module----------------
const express = require("express");
// ----------import multer------------------------
const multer = require("multer");
// ----------import path module-------------------
const path = require("path");
// ----------import axios-------------------------
const axios = require("axios");
// ----------Import express-session---------------
const session = require("express-session");
// ----------Import jwtwebtoken-------------------
const jwt = require("jsonwebtoken");
// ----------import NodeMailer--------------------
const nodemailer = require("nodemailer");
// ----------twilio info and import---------------
const accountSid = "AC02ca85c6dfb0cff5524cb8f4efbe6d48";
const authToken = "da7513ffc31d8554db3437720cf0253d";
const twilio = require("twilio")(accountSid, authToken);

// ----------import body-parser module------------
const bodyParser = require("body-parser");
// ----------import mongoose && connect to DB-----
const mongoose = require("mongoose");
mongoose.connect("mongodb://127.0.0.1:27017/schoolyDB");
// ----------import bcrypt------------------------
const bcrypt = require("bcrypt");
// ----------create express application-----------
const app = express();

//--------------------------------------------------Configuration section-----------------------------------------


// ----------Send JSON responses------------------
app.use(bodyParser.json());
// ----------Get objects from Request-------------
app.use(bodyParser.urlencoded({ extended: true }));
// ----------configuration du path----------------
app.use("/images", express.static(path.join("backend/images")));

const MIME_TYPE = {
  "image/png": "png",
  "image/jpeg": "jpg",
  "image/jpg": "jpg",
  "application/pdf": "pdf",
};

// ----------Security configuration--------------
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, Accept, Content-Type, X-Requested-with, Authorization, expiresIn"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, DELETE, OPTIONS, PATCH, PUT"
  );
  next();
});
// ----------multer config-----------------------
const storage = multer.diskStorage({
  // destination
  destination: (req, file, cb) => {
    const isValid = MIME_TYPE[file.mimetype];
    let error = new Error("Mime type is invalid");
    if (isValid) {
      error = null;
    }
    cb(null, "backend/images");
  },
  filename: (req, file, cb) => {
    const name = file.originalname.toLowerCase().split(" ").join("-");
    const extension = MIME_TYPE[file.mimetype];
    const imgName = name + "-" + Date.now() + "." + extension;
    cb(null, imgName);
  },
});
// session configuration
const secretKey = "lm&!a23pi@ja?pi3*5&$za@ioh5&zo6@oj3b@nob@1211oh.q$ls@o";
app.use(
  session({
    secret: secretKey,
    resave: false,
    saveUninitialized: true,
  })
);

// ----------nodemailer config-------------------
const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: "kallel.moez55@gmail.com",
    pass: "swugagvkcksrquve",
  },
});
//-----------------------------------Import Models---------------------------------
const User = require("./models/User");
const Course = require("./models/Course");
const Grade = require("./models/Grade");

//------------------User Projection to prevent sensitive information from being populated to front-end ------------
const userProjection = {
  pwd: 0,
  emailConfirmation: 0,
  isConfirmed: 0,
};
// -----------------------------------Business Logic---------------------------------

/*----------Signup----------*/
/*
app.post(
  "/users/signup",
  multer({ storage: storage }).fields([
    { name: "img", maxCount: 1 },
    { name: "cv", maxCount: 1 },
  ]),
  (req, res) => {
    console.log(req.body);
    
    bcrypt
      .hash(req.body.pwd, 10)
      .then((hashedPwd) => {
        req.body.pwd = hashedPwd;
        if (req.files && req.files["cv"] && req.body.role === "teacher") {
          req.body.cv =
            "http://localhost:3002" + "/images/" + req.files["cv"][0].filename;
        } else if (
          req.body.role === "student" &&
          req.files &&
          req.files["img"]
        ) {
          req.body.img =
            "http://localhost:3002" + "/images/" + req.files["img"][0].filename;
        }else if (req.body.role === "parent" && !req.files) {
          User.findOne({ tel: req.body.studentTel })
            .then((data) => {
              console.log(data);
              if (!data) {
                return res.status(404).json({ msg: "Student not found" });
              }
            })
            .catch((err) => {
              console.log(err);
              return res.status(500).json({ msg: "Internal server error" });
            });
        }
        console.log("why");
        let user = new User(req.body);
        user.save((err, doc) => {
          if (err) {
            return res.json({
              msg: "Error when signing up, email or tel already exist",
            });
          }
          res.json({
            msg: `Added ${doc.firstName} ${doc.lastName} with success`,
          });
          console.log(doc);
          // let userToConfirm = {
          //   id: doc._id,
          //   email: doc.email,
          // };
          // let emailToken = jwt.sign(userToConfirm, secretKey, {
          //   expiresIn: "1d",
          // });
          // transporter.sendMail(
          //   {
          //     from: "kallel.moez55@gmail.com",
          //     to: req.body.email,
          //     subject: "Hello from Moez",
          //     text: `You successfully made an account please click on the link below to confirm your email, http://localhost:3002/confirmation/${emailToken}`,
          //   },
          //   (err, result) => {
          //     err ? console.log(err) : console.log(result);
          //   }
          // );
        });
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json({ msg: "Internal server error" });
      });
  }
);
*/
app.post(
  "/users/signup",
  multer({ storage: storage }).fields([
    { name: "img", maxCount: 1 },
    { name: "cv", maxCount: 1 },
  ]),
  async (req, res) => {
    console.log(req.body);

    try {
      // Common logic for all roles
      const hashedPwd = await bcrypt.hash(req.body.pwd, 10);
      req.body.pwd = hashedPwd;

      // Role-specific logic
      if (req.body.role === "teacher") {
        req.body.isConfirmed = false;
        if (req.files && req.files["cv"]) {
          req.body.cv =
            "http://localhost:3002" + "/images/" + req.files["cv"][0].filename;
        }
      } else if (req.body.role === "student") {
        if (req.files && req.files["img"]) {
          req.body.img =
            "http://localhost:3002" + "/images/" + req.files["img"][0].filename;
        }
      } else if (req.body.role === "parent" && !req.files) {
        const data = await User.findOne({ tel: req.body.studentTel });
        if (!data) {
          return res.json({ msg: "Student not found" });
        } else {
          req.body.child = { _id: data._id };
          console.log(req.body.child);
        }
      }
      let user = new User(req.body);

      // Save the user
      const doc = await user.save();
      res.json({
        msg: `Added ${doc.firstName} ${doc.lastName} with success`,
      });
      console.log(doc);
    } catch (err) {
      console.error(err.message);
      return res.status(500).json({ msg: "Internal server error" });
    }
  }
);

/*----------Login----------*/
app.post("/users/login", (req, res) => {
  console.log(req.body);
  User.findOne({ tel: req.body.tel }).then((data) => {
    console.log("data", data);
    if (data) {
      bcrypt.compare(req.body.pwd, data.pwd).then((result) => {
        if (result) {
          if (1) {
            //data.emailConfirmation
            if (data.role == "teacher" && !data.isConfirmed) {
              res.json({ msg: "approval" });
            } else {
              let userToSend = {
                id: data._id,
                fName: data.firstName,
                lName: data.lastName,
                role: data.role,
              };
              let token = jwt.sign(userToSend, secretKey, { expiresIn: "1h" });
              res.json({
                msg: "success",
                token: token,
              });
              // twilio.messages
              //   .create({
              //     body: "You successfully logged into your account",
              //     from: "+19285850952",
              //     to: `+216${data.tel}`,
              //   })
              //   .then((message) => {
              //     console.log(message);
              //   });
            }
          } else {
            res.json({
              msg: "confirmation",
            });
          }
        } else {
          res.json({ msg: "wrong password" });
        }
      });
    } else {
      res.json({ msg: "This tel does not exist" });
    }
  });
});
//------------------BL add-course-----------
app.post("/courses", (req, res) => {
  console.log(req.body);
  let course = new Course(req.body);
  course.save((err, doc) => {
    err
      ? res.json({ msg: "something went wrong" })
      : res.json({ msg: `Added ${req.body.name} with success` });
  });
});
//------------------BL get courses by teacher ID-----------
app.get("/courses/mycourses/:id", (req, res) => {
  console.log(req.params.id);
  Course.find({ createdBy: req.params.id }).then((result) => {
    if (result.length != 0) {
      res.json({ courses: result });
    } else {
      res.json({ msg: "No course created yet" });
    }
  });
});
//------------------BL delete course -----------
app.delete("/courses/:id", (req, res) => {
  console.log(req.params.id);
  Course.deleteOne({ _id: req.params.id }).then((result) => {
    console.log(result);
    res.json({ msg: "Deleted with success" });
    Grade.deleteMany({ courseId: req.params.id }).then((result) => {
      console.log(result);
    });
    User.updateMany(
      { studentCourses: { $in: [req.params.id] } },
      { $pull: { studentCourses: req.params.id } }
    ).then((result) => {
      console.log(result);
    });
  });
});
//-------------------BL getCourseById -----------
app.get("/courses/:id", (req, res) => {
  console.log(req.params.id);
  Course.findById(req.params.id)
    .populate("assignedTo", userProjection)
    .then((result) => {
      console.log(result);
      res.json({ course: result });
    });
});
//-------------------BL update Course ------------
app.put("/courses", (req, res) => {
  console.log(req.body);
  Course.updateOne({ _id: req.body._id }, req.body).then((result) => {
    console.log(result);
    res.json({ msg: "updated successfully" });
  });
});
//------------------------BL assigning Course to student----------------------------
app.put("/courses/assigningCourses", (req, res) => {
  console.log(req.body);
  Course.findById(req.body.assignedCourse)
    .then((course) => {
      course.assignedTo.push(req.body.assignedStudent);
      course.save((err) => {
        if (err) {
          console.error(err);
        } else {
          User.findById(req.body.assignedStudent).then((user) => {
            user.studentCourses.push(req.body.assignedCourse);
            user.save((err) => {
              if (err) {
                console.error(err);
              } else {
                console.log("Student updated successfully");
              }
            });
          });
          console.log("Course updated successfully");
          res.json({ msg: `${course.name} has been assigned to this student` });
        }
      });
    })
    .catch((err) => {
      res.json({ msg: "Course not found" });
    });
});
//------------------BL get users by role---------------
app.get("/users/userType/:role", (req, res) => {
  console.log(req.params.role);
  if (req.params.role == "parent") {
    User.find({ role: req.params.role })
      .populate("child")
      .then((result) => {
        if (result.length != 0) {
          res.json({ users: result });
        } else {
          res.json({ msg: "users not found" });
        }
      });
  } else {
    User.find({ role: req.params.role }).then((result) => {
      if (result.length != 0) {
        res.json({ users: result });
      } else {
        res.json({ msg: "users not found" });
      }
    });
  }
});
//-------------------------BL teacher account validation--------------------------
app.get("/users/teacherValidation/:id", (req, res) => {
  console.log(req.params.id);
  let obj = {
    isConfirmed: true,
  };
  User.updateOne({ _id: req.params.id }, obj)
    .then((result) => {
      res.json({ msg: "account validated" });
    })
    .catch((err) => {
      res.json({ msg: "internal server error" });
    });
});
//-------------------------BL get teacher by speciality------------------
app.get("/users/getTeacherBySpeciality/:speciality", (req, res) => {
  console.log(req.params.speciality);

  User.findOne({ speciality: req.params.speciality }).then((result) => {
    if (result) {
      console.log(result);
      res.json({ teacher: result });
    } else {
      console.log(result);
      res.json({ msg: "No teacher with this speciality" });
    }
  });
});
//-------------------------BL delete User ---------------------------------
app.delete("/users/:id", (req, res) => {
  console.log(req.params.id);
  User.findById(req.params.id).then((user) => {
    if (user.role == "student") {
      User.deleteOne({ _id: req.params.id })
        .then((result) => {
          console.log(result);
          Grade.deleteMany({ studentId: user._id }).then((data) => {
            console.log(data);
          });
          Course.updateMany(
            { assignedTo: { $in: [user._id] } },
            { $pull: { assignedTo: user._id } }
          ).then((resultCourse) => {
            console.log(resultCourse);
          });
          res.json({ msg: "deleted successfully" });
        })
        .catch((err) => {
          res.json({ msg: " internal server error" });
        });
    } else if (user.role == "teacher") {
      User.deleteOne({ _id: user._id })
        .then((result) => {
          console.log(result);

          Course.find({ createdBy: user._id }).then((findedCourses) => {
            console.log(findedCourses);
            Grade.deleteMany({ teacherId: user._id }).then((data) => {
              console.log(data);
            });
            User.updateMany(
              { studentCourses: { $in: [findedCourses._id] } },
              { $pull: { studentCourses: findedCourses._id } }
            ).then((courseUpdateResult) => {
              console.log("courseUpdateResult", courseUpdateResult);
            });
            Course.deleteMany({ createdBy: user._id }).then((resultDelete) => {
              console.log("resultDelete", resultDelete);
            });
          });
          res.json({ msg: "deleted successfully" });
        })
        .catch((err) => {
          res.json({ msg: " internal server error" });
        });
    } else {
      User.deleteOne({ _id: req.params.id })
        .then((result) => {
          res.json({ msg: "deleted successfully" });
        })
        .catch((err) => {
          res.json({ msg: " internal server error" });
        });
    }
  });
});
//-------------------------BL update User -------------------------------
app.put("/users", (req, res) => {
  console.log(req.body);
  User.updateOne({ _id: req.body._id }, req.body)
    .then((result) => {
      res.json({ msg: "Updated successfully" });
    })
    .catch((err) => {
      res.json({ msg: "Internal server error" });
    });
});
//-------------------------BL get User By ID ----------------------------------
app.get("/users/userId/:id", (req, res) => {
  console.log(req.params.id);
  User.findById(req.params.id)
    .populate("studentCourses")
    .then((result) => {
      res.json({ user: result });
    })
    .catch((err) => {
      res.json({ msg: "object not found" });
    });
});
//-------------------------get Courses where studentId is not included in assignedTo field------------
app.get("/courses/assigningCourses/:id", (req, res) => {
  console.log(req.params.id);
  Course.find({ assignedTo: { $nin: [req.params.id] } })
    .populate({
      path: "createdBy",
      select: "lastName", // Specify the field(s) you want to include
    })
    .then((result) => {
      console.log(result);
      res.json({ courses: result });
    })
    .catch((err) => {
      res.json({ msg: "internal server error" });
    });
});

//-------------------------------BL add Grade-----------------------------------
app.post("/grades", (req, res) => {
  console.log(req.body);
  const grade = new Grade(req.body);
  grade.save((err, doc) => {
    if (err) {
      res.json({ msg: "error while saving" });
    } else {
      // console.log(req.body.courseId);
      // Course.findById()
      res.json({ msg: "Saved successfully" });
    }
  });
});
//-------------------BL get grade by student and course id -----------------------
app.post("/grades/getGrade", (req, res) => {
  console.log(req.body);
  Grade.findOne({
    studentId: req.body.studentId,
    courseId: req.body.courseId,
  })
    .populate({
      path: "courseId",
      select: "name", // Specify the field(s) you want to include
    })
    .populate({
      path: "teacherId",
      select: "lastName", // Specify the field(s) you want to include
    })
    .then((result) => {
      console.log(result);
      res.json({ grade: result });
    })
    .catch((err) => {
      res.json({ msg: "internal error" });
    });
});
//----------------------BL update Grade --------------------------------
app.put("/grades", (req, res) => {
  Grade.updateOne({ _id: req.body._id }, req.body)
    .then((result) => {
      console.log(result);
      if (result) {
        res.json({ msg: "Updated successfully" });
      } else {
        res.json({ msg: "Error while updating" });
      }
    })
    .catch((err) => {
      res.json({ msg: "Internal server error" });
    });
});
//-----------------------------BL Get grades By course ID---------------------
app.get("/grades/getGrades/courseId/:id", (req, res) => {
  console.log("test", req.params.id);
  const objIdCourse = mongoose.Types.ObjectId(req.params.id);
  Grade.find({ courseId: objIdCourse })
    .then((result) => {
      res.json({ grades: result });
    })
    .catch((err) => {
      res.status(500).json({ msg: "Internal server error" });
    });
});
//--------------------------------BL get all courses-------------------------
app.get("/courses", (req, res) => {
  Course.find()
    .populate({
      path: "createdBy",
      select: "lastName",
    })
    .then((result) => {
      res.json({ courses: result });
    })
    .catch((err) => {
      res.json({ msg: "internal server error" });
    });
});
//------------------------------BL get all grades --------------------------
app.get("/grades", (req, res) => {
  Grade.find()
    .populate({
      path: "courseId",
      select: "name", // Specify the field(s) you want to include
    })
    .populate({
      path: "teacherId",
      select: "lastName", // Specify the field(s) you want to include
    })
    .populate({
      path: "studentId",
      select: "firstName", // Specify the field(s) you want to include
    })
    .then((result) => {
      res.json({ grades: result });
    })
    .catch((err) => {
      res.json({ msg: "Internal server error" });
    });
});
//----------------------------BL Delete Grade -------------------------------
app.delete("/grades/:id", (req,res)=>{
  console.log("to delete", req.params.id);
  Grade.deleteOne({_id: req.params.id}).then((result)=>{
    res.json({msg:"deleted successfully"});
  }).catch((err)=>{
    console.log(err);
    res.json({msg:"Internal server error"});
  })
})
//-------------------------------------Export Section--------------------------------
module.exports = app;
