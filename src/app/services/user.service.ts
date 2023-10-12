import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class UserService {
  userUrl: string = "http://localhost:3002/users";
  constructor(private http: HttpClient) {}

  login(obj: any) {
    return this.http.post<{ msg: string; token: any }>(
      this.userUrl + "/login",
      obj
    );
  }

  signup(obj: any, file: File = null) {
    if (obj.role === "parent" || obj.role === "admin") {
      console.log(obj);
      return this.http.post<{ msg: string }>(this.userUrl + "/signup", obj);
    } else {
      let fData = new FormData();
      fData.append("firstName", obj.firstName);
      fData.append("lastName", obj.lastName);
      fData.append("email", obj.email);
      fData.append("tel", obj.tel);
      fData.append("pwd", obj.pwd);
      fData.append("role", obj.role);
      fData.append("address", obj.address);
      if (obj.role === "teacher") {
        fData.append("isconfirmed", obj.isConfirmed);
        fData.append("speciality", obj.speciality);
        fData.append("cv", file);
      } else if (obj.role === "student") {
        fData.append("img", file);
      }
      console.log(fData);
      return this.http.post<{ msg: string }>(this.userUrl + "/signup", fData);
    }
  }
  getUsersByRole(role) {
    return this.http.get<{ msg: string; users: any }>(
      `${this.userUrl}/userType/${role}`
    );
  }
  teacherValidation(id) {
    return this.http.get<{ msg: string }>(
      `${this.userUrl}/teacherValidation/${id}`
    );
  }
  getTeacherBySpeciality(speciality) {
    return this.http.get<{ msg: string; teacher: any }>(
      `${this.userUrl}/getTeacherBySpeciality/${speciality}`
    );
  }
  getUserById(id) {
    return this.http.get<{ user: any; msg: string }>(
      `${this.userUrl}/userId/${id}`
    );
  }
  deleteUser(id) {
    return this.http.delete<{ msg: string }>(`${this.userUrl}/${id}`);
  }
  updateUser(obj) {
    return this.http.put<{ msg: string }>(this.userUrl, obj);
  }
}
