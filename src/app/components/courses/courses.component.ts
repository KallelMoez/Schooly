import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CourseService } from 'src/app/services/course.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {
  coursesTab: any = [];
  pageUrl:string;
  constructor(private cService:CourseService, private router:Router) { }

  ngOnInit() {
    this.pageUrl = this.router.url;
    console.log(this.pageUrl);
    
    this.cService.getAllCourses().subscribe((data)=>{
      console.log(data.courses);
      this.coursesTab = data.courses;
    })
  }

}
