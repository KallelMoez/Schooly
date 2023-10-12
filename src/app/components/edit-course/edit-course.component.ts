import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { CourseService } from "src/app/services/course.service";

@Component({
  selector: "app-edit-course",
  templateUrl: "./edit-course.component.html",
  styleUrls: ["./edit-course.component.css"],
})
export class EditCourseComponent implements OnInit {
  course: any = {};
  id: any;
  updateCourseForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private cService: CourseService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.paramMap.get("id");
    this.cService.getCourseById(this.id).subscribe((data) => {
      console.log(data);
      this.course = data.course;
    });
    this.updateCourseForm = this.fb.group({
      name: ["", [Validators.required, Validators.minLength(3)]],
      description: ["", [Validators.required, Validators.minLength(6)]],
      period: ["", [Validators.required, Validators.minLength(4)]],
    });
  }
  validate() {
    this.cService.updateCourse(this.course).subscribe((data) => {
      console.log(data.msg);
    });
  }
}
