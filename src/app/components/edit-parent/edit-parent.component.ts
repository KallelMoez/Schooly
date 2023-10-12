import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-edit-parent',
  templateUrl: './edit-parent.component.html',
  styleUrls: ['./edit-parent.component.css']
})
export class EditParentComponent implements OnInit {
  parent: any = {};
  parentId: any;
  editParentForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit() {
    this.parentId = this.activatedRoute.snapshot.paramMap.get("id");
    this.userService.getUserById(this.parentId).subscribe((data) => {
      console.log(data.user);
      this.parent = data.user;
    });
    this.editParentForm = this.fb.group({
      firstName: ["", [Validators.required, Validators.minLength(4)]],
      lastName: ["", [Validators.required, Validators.minLength(4)]],
      email: ["", [Validators.required, Validators.email]],
      tel: ["", [Validators.required, Validators.minLength(8)]],
      address: ["", [Validators.required, Validators.minLength(4)]],
    });
  }
  update() {
    this.userService.updateUser(this.parent).subscribe((data) => {
      console.log(data.msg);
      this.router.navigate(["admin-dashboard"]);
    });
  }
}
