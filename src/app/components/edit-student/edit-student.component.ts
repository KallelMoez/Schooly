import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { UserService } from "src/app/services/user.service";

@Component({
  selector: "app-edit-student",
  templateUrl: "./edit-student.component.html",
  styleUrls: ["./edit-student.component.css"],
})
export class EditStudentComponent implements OnInit {
  student: any = {};
  studentId: any;
  editStudentForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit() {
    this.studentId = this.activatedRoute.snapshot.paramMap.get("id");
    this.userService.getUserById(this.studentId).subscribe((data) => {
      console.log(data.user);
      this.student = data.user;
    });
    this.editStudentForm = this.fb.group({
      firstName: ["", [Validators.required, Validators.minLength(4)]],
      lastName: ["", [Validators.required, Validators.minLength(4)]],
      email: ["", [Validators.required, Validators.email]],
      tel: ["", [Validators.required, Validators.minLength(8)]],
      address: ["", [Validators.required, Validators.minLength(4)]],
    });
  }
  update() {
    this.userService.updateUser(this.student).subscribe((data) => {
      console.log(data.msg);
      this.router.navigate(["admin-dashboard"]);
    });
  }
}
