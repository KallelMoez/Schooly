import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { decodeToken } from 'src/app/data/token-decode';
import { CourseService } from 'src/app/services/course.service';

@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.css']
})
export class AddCourseComponent implements OnInit {
  courseForm: FormGroup;
  resMsg: string="";
  constructor(private fb:FormBuilder, private cService:CourseService, private router:Router) { }

  ngOnInit() {
    let token:any = sessionStorage.getItem("token");
    let decodedToken:any = decodeToken(token);
    this.courseForm = this.fb.group({
      name: ["", [Validators.required, Validators.minLength(3)]],
      description: ["", [Validators.required, Validators.minLength(6)]],
      period: ["", [Validators.required, Validators.minLength(4)]],
      createdBy: [decodedToken.id]
    })
  }

  addCourse(){
    console.log(this.courseForm.value);
    this.cService.addSubject(this.courseForm.value).subscribe((data)=>{
      console.log(data);
      this.resMsg = data.msg;
      this.router.navigate(["teacher-dashboard"]);
    })
  }

}
