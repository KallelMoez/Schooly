import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { decodeToken } from 'src/app/data/token-decode';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  token:any;
  user:any;
  constructor(private router:Router) { }

  ngOnInit() {
  }
  isLoggedIn() {
    let jwt = sessionStorage.getItem("token");
    if (jwt) {
      this.user = decodeToken(jwt);
    }
    return !!jwt;
  }
  logout(){
    this.token = null;
    this.user = null;
    sessionStorage.removeItem("token");
    this.router.navigate([""]);
  }
}
