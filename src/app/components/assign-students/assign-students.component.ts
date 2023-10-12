import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { CourseService } from "src/app/services/course.service";
import { UserService } from "src/app/services/user.service";

@Component({
  selector: "app-assign-students",
  templateUrl: "./assign-students.component.html",
  styleUrls: ["./assign-students.component.css"],
})
export class AssignStudentsComponent implements OnInit {
  studentId: any;
  student: any = {};
  coursesTab: any = [];
  courseId: any;
  resMsg: string = "";
  constructor(
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
    private cService: CourseService
  ) {}

  ngOnInit() {
    this.studentId = this.activatedRoute.snapshot.paramMap.get("id");
    this.userService.getUserById(this.studentId).subscribe((data) => {
      console.log(data);
      this.student = data.user;
    });
    this.reloadCourseTab();
  }
  reloadCourseTab() {
    this.cService.getCourseOffStudentId(this.studentId).subscribe((data) => {
      console.log(data.courses);
      this.coursesTab = data.courses;
    });
  }
  getCourseId(evt) {
    console.log(evt.target.value);
    this.courseId = evt.target.value;
    this.resMsg="";
  }
  assignCourseToStudent() {
    
    if (!this.courseId || this.courseId=="none") {
      this.resMsg = "please select a course";
    } else {
      let obj: any = {
        assignedStudent: this.studentId,
        assignedCourse: this.courseId,
      };
      this.cService.assignCourse(obj).subscribe((data) => {
        console.log(data.msg);
        this.resMsg = data.msg;
        this.reloadCourseTab();
        this.courseId="none";
      });
      
    }
  }
}
