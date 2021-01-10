import { basicAlert } from 'src/app/@shared/alerts/toasts';
import { Injectable } from '@angular/core';
import { CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { AuthService } from '@core/services/auth.service';
import jwtDecode from "jwt-decode";
import { userInfo } from 'os';
import { ALERT_TYPE } from '@shared/alerts/values.config';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivateChild {
  constructor(private authServices: AuthService, private router: Router){}
  canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
    ) {
      //check session
      if(this.authServices.getSession()) {
        //check token is active
        const tokenData = this.decodeToken()
        //@ts-ignore
        if(tokenData.exp < new Date().getTime() / 1000){
          basicAlert(ALERT_TYPE.INFO, "Session expired, start a new seesion to continue");
          this.router.navigate(['/login']);
          return false
        }
        //@ts-ignore
        if(tokenData.user.role === "ADMIN"){
          return true
        }
        // console.log(tokenData)
      }
      //check admin role
    basicAlert(ALERT_TYPE.INFO, "Login not detected");
    this.router.navigate(['/login']);
    return false;
  }

  decodeToken(){
    return jwtDecode(this.authServices.getSession().token)
  }
  
}
