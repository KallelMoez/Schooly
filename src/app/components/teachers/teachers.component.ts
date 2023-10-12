import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-teachers',
  templateUrl: './teachers.component.html',
  styleUrls: ['./teachers.component.css']
})
export class TeachersComponent implements OnInit {
  teachersTab:any;
  pageUrl:string;
  constructor(private userService: UserService, private router:Router) { }

  ngOnInit() {
    this.pageUrl = this.router.url;
    this.userService.getUsersByRole("teacher").subscribe((data)=>{
      console.log(data.users);
      this.teachersTab = data.users;
    })
  }

}
