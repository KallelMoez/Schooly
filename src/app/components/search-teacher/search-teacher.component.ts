import { Component, OnInit } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { UserService } from "src/app/services/user.service";

@Component({
  selector: "app-search-teacher",
  templateUrl: "./search-teacher.component.html",
  styleUrls: ["./search-teacher.component.css"],
})
export class SearchTeacherComponent implements OnInit {
  searchForm: FormGroup;
  teacher: any = {};
  findedTeacher:any;
  resMsg: string = "";
  isFound: boolean = true;
  constructor(private userService: UserService) {}

  ngOnInit() {}
  search() {
    console.log("test");
    if (!this.teacher.speciality || this.teacher.speciality == "") {
      this.resMsg = "Please enter a speciality to search";
      this.isFound = true;
      console.log(this.resMsg);
      console.log(this.teacher);
    } else {
      this.userService
        .getTeacherBySpeciality(this.teacher.speciality)
        .subscribe((data) => {
          if (data.teacher) {
            console.log(data.teacher);
            this.findedTeacher = data.teacher;
            this.isFound = false;
          } else {
            this.resMsg = data.msg;
            this.isFound = true;
          }
          console.log(this.resMsg);
          console.log(this.teacher);
        });
    }
  }
}
