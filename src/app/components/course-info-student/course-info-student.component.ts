import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { decodeToken } from "src/app/data/token-decode";
import { CourseService } from "src/app/services/course.service";
import { GradeService } from "src/app/services/grade.service";
import { UserService } from "src/app/services/user.service";

@Component({
  selector: "app-course-info-student",
  templateUrl: "./course-info-student.component.html",
  styleUrls: ["./course-info-student.component.css"],
})
export class CourseInfoStudentComponent implements OnInit {
  courseId: any;
  studentId: any;
  course: any = {};
  grade: any = {};
  decodedToken:any;
  constructor(
    private activatedRoute: ActivatedRoute,
    private gradeService: GradeService,
    private cService: CourseService,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.courseId = this.activatedRoute.snapshot.paramMap.get("id");
    // this.cService.getCourseById(this.courseId).subscribe((data) => {
    //   console.log(data);
    //   console.log(data.course.name);

    //   this.course = data.course;
    // });
    let token: any = sessionStorage.getItem("token");
     this.decodedToken = decodeToken(token);
     console.log(this.decodedToken);
     
    if (this.decodedToken.role == "parent") {
      this.userService.getUserById(this.decodedToken.id).subscribe((data) => {
        this.studentId = data.user.child;
        this.gradeService
      .getGradeByStudentAndCourseId({
        studentId: this.studentId,
        courseId: this.courseId,
      })
      .subscribe((data) => {
        console.log(data.grade);
        this.grade = data.grade;
      });
      });
    } else if (this.decodedToken.role == "student") {
      this.studentId = this.decodedToken.id;
      this.gradeService
      .getGradeByStudentAndCourseId({
        studentId: this.studentId,
        courseId: this.courseId,
      })
      .subscribe((data) => {
        console.log(data.grade);
        this.grade = data.grade;
      });
    }

    
  }
}
