import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { decodeToken } from "src/app/data/token-decode";
import { CourseService } from "src/app/services/course.service";
import { UserService } from "src/app/services/user.service";

@Component({
  selector: "app-student-dashboard",
  templateUrl: "./student-dashboard.component.html",
  styleUrls: ["./student-dashboard.component.css"],
})
export class StudentDashboardComponent implements OnInit {
  studentId: any;
  coursesTab: any = [];
  pageUrl:string;
  constructor(private userService: UserService, private router:Router) {}

  ngOnInit() {
    this.pageUrl = this.router.url;
    let token = sessionStorage.getItem("token");
    let decodedToken: any = decodeToken(token);
    if (decodedToken.role == "parent") {
      this.userService.getUserById(decodedToken.id).subscribe((data) => {
        this.studentId = data.user.child;
        this.userService.getUserById(this.studentId).subscribe((data) => {
          console.log(data.user);
          this.coursesTab = data.user.studentCourses;
        });
      });
    } else if (decodedToken.role == "student") {
      this.studentId = decodedToken.id;
      this.userService.getUserById(this.studentId).subscribe((data) => {
        console.log(data.user);
        this.coursesTab = data.user.studentCourses;
      });
    }
  }
}
