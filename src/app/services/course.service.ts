import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  courseUrl:string = "http://localhost:3002/courses"
  constructor(private http: HttpClient) { }

  addSubject(obj){
    return this.http.post<{msg: string}>(this.courseUrl, obj);
  }
  getCourseByTeacherId(id){
    return this.http.get<{msg: string; courses:any}>(`${this.courseUrl}/mycourses/${id}`);
  }
  removeCourse(id){
    return this.http.delete<{msg: string}>(`${this.courseUrl}/${id}`);
  }
  getCourseById(id){
    return this.http.get<{course:any; msg:string}>(`${this.courseUrl}/${id}`);
  }
  updateCourse(obj){
    return this.http.put<{msg: string}>(this.courseUrl, obj);
  }
  getCourseOffStudentId(id){
    return this.http.get<{courses:any; msg:string}>(`${this.courseUrl}/assigningCourses/${id}`);
  }
  assignCourse(obj){
    return this.http.put<{msg:string}>(`${this.courseUrl}/assigningCourses`, obj);
  }
  getAllCourses(){
    return this.http.get<{courses:any; msg:string}>(this.courseUrl);
  }
}
