import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { UserService } from "src/app/services/user.service";

@Component({
  selector: "app-edit-teacher",
  templateUrl: "./edit-teacher.component.html",
  styleUrls: ["./edit-teacher.component.css"],
})
export class EditTeacherComponent implements OnInit {
  teacherId: any;
  teacher: any = {};
  editTeacherForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
    private router:Router
  ) {}

  ngOnInit() {
    this.teacherId = this.activatedRoute.snapshot.paramMap.get("id");
    this.userService.getUserById(this.teacherId).subscribe((data) => {
      console.log(data.user);
      this.teacher = data.user;
    });
    this.editTeacherForm = this.fb.group({
      firstName: ["", [Validators.required, Validators.minLength(4)]],
      lastName: ["", [Validators.required, Validators.minLength(4)]],
      email: ["", [Validators.required, Validators.email]],
      tel: ["", [Validators.required, Validators.minLength(8)]],
      address: ["", [Validators.required, Validators.minLength(4)]],
      speciality: ["", [Validators.required, Validators.minLength(4)]],
    });
  }
  update() {
    this.userService.updateUser(this.teacher).subscribe((data) => {
      console.log(data.msg);
      this.router.navigate(["admin-dashboard"]);
    });
  }
}
