import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class GradeService {
  gradeUrl: string = "http://localhost:3002/grades";
  constructor(private http: HttpClient) {}

  addGrade(obj) {
    return this.http.post<{ msg: string }>(this.gradeUrl, obj);
  }
  getGradeById(id) {
    return this.http.get<{ grade: any; msg: string }>(`${this.gradeUrl}/${id}`);
  }
  getGradeByStudentAndCourseId(obj) {
    return this.http.post<{ grade: any; msg: string }>(
      `${this.gradeUrl}/getGrade`,
      obj
    );
  }
  getGradesByCourseId(id) {
    return this.http.get<{ grades: any; msg: string }>(
      `${this.gradeUrl}/getGrades/courseId/${id}`
    );
  }
  updateGrade(obj) {
    return this.http.put<{ msg: string }>(this.gradeUrl, obj);
  }
  deleteGrade(id) {
    return this.http.delete<{ msg: string }>(`${this.gradeUrl}/${id}`);
  }
  getAllGrades() {
    return this.http.get<{ grades: any; msg: string }>(this.gradeUrl);
  }
}
