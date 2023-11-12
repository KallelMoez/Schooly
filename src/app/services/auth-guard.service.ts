import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { decodeToken } from '../data/token-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate{
  
  constructor(private router:Router) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    let token:any = sessionStorage.getItem("token");
    if(!token){
      this.router.navigate(["login"]);
      return false;
    }else{
      let decodedToken:any = decodeToken(token);
      if (route.data.expectedRoles.includes(decodedToken.role)){
        console.log(route.data.expectedRoles);
        
        return true;
      }else{
        this.router.navigate(["/"]);
        return false;
      }
    }

  
  }
}
