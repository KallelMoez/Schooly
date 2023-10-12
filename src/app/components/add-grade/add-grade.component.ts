import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { decodeToken } from "src/app/data/token-decode";
import { GradeService } from "src/app/services/grade.service";

@Component({
  selector: "app-add-grade",
  templateUrl: "./add-grade.component.html",
  styleUrls: ["./add-grade.component.css"],
})
export class AddGradeComponent implements OnInit {
  grade: any = {};
  gradeForm: FormGroup;
  studentId: any;
  courseId: any;
  teacherId:any;
  decodedToken:any
  constructor(
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router,
    private gradeService: GradeService
  ) {}

  ngOnInit() {
    
    let token: any = sessionStorage.getItem("token");
    this.decodedToken = decodeToken(token);
    this.teacherId = this.decodedToken.id
    this.studentId = this.activatedRoute.snapshot.paramMap.get("studentId");
    this.courseId = this.activatedRoute.snapshot.paramMap.get("courseId");
    this.gradeForm = this.fb.group({
      evaluation: ["", [Validators.required, Validators.minLength(4)]],
      note: ["", [Validators.required, Validators.min(0), Validators.max(20)]],
      studentId: [this.studentId],
      courseId: [this.courseId],
      teacherId: [this.teacherId],
    });
    this.gradeService.getGradeByStudentAndCourseId({courseId: this.courseId, studentId: this.studentId}).subscribe((data)=>{
      console.log(data.grade);
      console.log(data.msg);
      
      if(data.grade){
        this.grade = data.grade;
      }
      
    })
  }

  newGrade() {
    this.grade.studentId = this.studentId;
    this.grade.courseId = this.courseId;
    this.grade.teacherId = this.teacherId;
    this.gradeService.addGrade(this.grade).subscribe((data) => {
      console.log(data.msg);
      this.router.navigate([`course/assigned-students/${this.courseId}`]);
    });
  }

  update() {
    this.gradeService.updateGrade(this.grade).subscribe((data) => {
      console.log(data.msg);
      this.router.navigate([`course/assigned-students/${this.courseId}`]);
    });
  }
}
