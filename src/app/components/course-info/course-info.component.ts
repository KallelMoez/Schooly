import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { decodeToken } from "src/app/data/token-decode";
import { CourseService } from "src/app/services/course.service";
import { GradeService } from "src/app/services/grade.service";

@Component({
  selector: "app-course-info",
  templateUrl: "./course-info.component.html",
  styleUrls: ["./course-info.component.css"],
})
export class CourseInfoComponent implements OnInit {
  course: any = {};
  id: any;
  gradesTab: any = [];
  connectedUser:any;
  constructor(
    private activatedRoute: ActivatedRoute,
    private cService: CourseService,
    private gradeService: GradeService
  ) {}

  ngOnInit() {
    let token = sessionStorage.getItem("token");
    this.connectedUser = decodeToken(token);
    this.id = this.activatedRoute.snapshot.paramMap.get("id");
    this.cService.getCourseById(this.id).subscribe((data) => {
      console.log(data);
      this.course = data.course;
      
    });
    this.gradeService.getGradesByCourseId(this.id).subscribe((data) => {
      console.log(data.grades);
      this.gradesTab = data.grades;
    });
  }
  checkGrade(id) {
    for (let i = 0; i < this.gradesTab.length; i++) {
      if (this.gradesTab[i].studentId == id) {
        return true;
      }
    }
    return false;
  }
}
