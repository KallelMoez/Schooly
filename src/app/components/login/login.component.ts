import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { decodeToken } from "src/app/data/token-decode";
import { UserService } from "src/app/services/user.service";
// import jwt_decode from "jwt-decode";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  resMsg: string = "";
  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {}
  ngOnInit() {
    this.loginForm = this.fb.group({
      tel: ["", [Validators.required, Validators.minLength(8)]],
      pwd: ["", [Validators.required]],
    });
  }

  login() {
    console.log(this.loginForm.value);

    this.userService.login(this.loginForm.value).subscribe((data) => {
      console.log("data ", data);
      if (data.msg == "success") {
        let decodedToken: any = decodeToken(data.token);
        console.log(decodedToken);
        sessionStorage.setItem("token", data.token);
        if (decodedToken.role == "parent") {
          this.router.navigate([""]);
        } else if (decodedToken.role == "student") {
          this.router.navigate(["student-dashboard"]);
        } else if (decodedToken.role == "admin") {
          this.router.navigate(["admin-dashboard"]);
        } else {
          this.router.navigate(["teacher-dashboard"]);
        }
      } else if (data.msg == "confirmation") {
        this.resMsg =
          "Please go ahead and confirm your account through your email inbox";
      } else if (data.msg == "approval") {
        this.resMsg = "Your account is waiting on admin's approval";
      } else {
        this.resMsg = "Please check Tel/Pwd";
      }
    });
  }
  // decodeToken(token: string) {
  //   return jwt_decode(token);
  //   }
}
