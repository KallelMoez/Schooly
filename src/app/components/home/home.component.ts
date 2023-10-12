import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { decodeToken } from "src/app/data/token-decode";
import { UserService } from "src/app/services/user.service";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
})
export class HomeComponent implements OnInit {
  user: any;
  resMsg: string = "";
  searchCoursesForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit() {
    let token: any = sessionStorage.getItem("token");
    if(token){
      this.user = decodeToken(token);
    this.searchCoursesForm = this.fb.group({
      childNumber: ["", [Validators.required, Validators.pattern('^[0-9]{8}$')]],
      parentId: [this.user.id],
    });
    }
  }
  search() {
    this.userService.getUserById(this.user.id).subscribe((data) => {
      console.log(data.user);
      if (this.searchCoursesForm.value.childNumber == data.user.studentTel) {
        console.log("success");
        this.router.navigate(["child-dashboard"]);
      } else {
        this.resMsg = "Please type in the correct phone number of your child";
      }
    });
  }
}
