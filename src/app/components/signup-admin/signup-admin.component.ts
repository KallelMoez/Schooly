import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-signup-admin',
  templateUrl: './signup-admin.component.html',
  styleUrls: ['./signup-admin.component.css']
})
export class SignupAdminComponent implements OnInit {
  signupForm: FormGroup;
  constructor(private fb:FormBuilder, private userService: UserService, private router:Router) { }

  ngOnInit() {
    this.signupForm = this.fb.group({
      firstName: ["", [Validators.required, Validators.minLength(4)]],
        lastName: ["", [Validators.required, Validators.minLength(4)]],
        email: ["", [Validators.required, Validators.email]],
        tel: ["", [Validators.required, Validators.pattern('^[0-9]{8}$')]],
        address: ["", [Validators.required, Validators.minLength(4)]],
        pwd: ["", [Validators.required, Validators.pattern('(?=.*[a-z])[A-Za-z\d$@$!%*?&].{8,}')]], // add this after (?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])
        confirmPwd: [""],
        role: ["admin"],
    });
  }
  signup(){
    console.log(this.signupForm.value);
    
    this.userService.signup(this.signupForm.value).subscribe((data)=>{
      console.log(data.msg);
      this.router.navigate([""]);
    });
    
  }
}
