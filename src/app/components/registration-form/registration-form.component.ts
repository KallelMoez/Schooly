import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { confirmPassword } from "src/app/data/custom-validators";
import { UserService } from "src/app/services/user.service";

@Component({
  selector: "app-registration-form",
  templateUrl: "./registration-form.component.html",
  styleUrls: ["./registration-form.component.css"],
})
export class RegistrationFormComponent implements OnInit {
  userRole: string = "";
  signupForm: FormGroup;
  fileError: string="please select a file";
  
  constructor(
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private userService: UserService,
    private router:Router
  ) {}

  ngOnInit() {
    this.userRole = this.activatedRoute.snapshot.data["role"];
    this.signupForm = this.fb.group(
      {
        firstName: ["", [Validators.required, Validators.minLength(4)]],
        lastName: ["", [Validators.required, Validators.minLength(4)]],
        email: ["", [Validators.required, Validators.email]],
        tel: ["", [Validators.required, Validators.pattern('^[0-9]{8}$')]],
        address: ["", [Validators.required, Validators.minLength(4)]],
        pwd: ["", [Validators.required, Validators.pattern('(?=.*[a-z])[A-Za-z\d$@$!%*?&].{8,}')]], // add this after (?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])
        confirmPwd: [""],
        role: [""],
      },
      { validators: confirmPassword("pwd", "confirmPwd") }
    );
    this.addSpecificControls(this.userRole);
  }

  addSpecificControls(role: string) {
    switch (role) {
      case "teacher":
        this.signupForm.addControl(
          "speciality",
          this.fb.control("", [Validators.required, Validators.minLength(4)])
        );
        this.signupForm.addControl(
          "cv",
          this.fb.control("", [Validators.required])
        );
        // this.signupForm.get("isConfimerd").setValue(false);
        this.signupForm.get("role").setValue("teacher");
        break;
      case "student":
        this.signupForm.addControl(
          "img",
          this.fb.control("", [Validators.required])
        );
        this.signupForm.get("role").setValue("student");
        break;
      case "parent":
        this.signupForm.addControl(
          "studentTel",
          this.fb.control("", [Validators.required])
        );
        this.signupForm.get("role").setValue("parent");
        break;

      default:
        break;
    }
  }

  onImageSelected(event: Event) {
   
    
    const file = (event.target as HTMLInputElement).files[0];
    const fileControl = this.signupForm.get("img");
    const fileExtension = file.name.split(".").pop().toLowerCase();
    if (!file) {
      fileControl.setValue(null);
      fileControl.markAsTouched(); 
      fileControl.setErrors({ required: true });
      this.fileError = "please select a file";
      return;
    } else {
      if (fileExtension === "png" || fileExtension === "jpg" || fileExtension === "jpeg") {
        fileControl.setValue(file);
        fileControl.markAsTouched();
        fileControl.setErrors(null);
        const reader = new FileReader();
        reader.readAsDataURL(file);
        this.fileError="";
      } else {
        (event.target as HTMLInputElement).value = "";
        fileControl.setErrors({ invalidExtension: true });
        fileControl.markAsTouched();
        this.fileError = "file extension not valid"
      }
    }
    console.log(this.fileError);
  }
  onFileSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    const fileControl = this.signupForm.get("cv");
    const fileExtension = file.name.split(".").pop().toLowerCase();
    if (!file) {
      fileControl.setValue(null);
      fileControl.markAsTouched(); 
      fileControl.setErrors({ required: true });
      this.fileError = "please select a file"
      return;
    } else {
      if (fileExtension === "pdf") {
        fileControl.setValue(file);
        fileControl.markAsTouched();
        fileControl.setErrors(null);
        const reader = new FileReader();
        reader.readAsDataURL(file);
        this.fileError = ""
      } else {
        (event.target as HTMLInputElement).value = "";
        fileControl.setErrors({ invalidExtension: true });
        fileControl.markAsTouched();
        this.fileError = "file extension not valid"
      }
    }
  }
  signup(){
    console.log(this.signupForm.value);
    if (this.userRole === "student") {
      this.userService.signup(this.signupForm.value, this.signupForm.value.img).subscribe((data)=>{
        console.log(data.msg);
        // this.router.navigate([""]);
      });
    } else if (this.userRole === "teacher") {
      this.userService.signup(this.signupForm.value, this.signupForm.value.cv).subscribe((data)=>{
        console.log(data.msg);
        // this.router.navigate([""]);
      });
    }else{
      this.userService.signup(this.signupForm.value).subscribe((data)=>{
        console.log(data.msg);
        // this.router.navigate([""]);
      });
    }
  }
}
