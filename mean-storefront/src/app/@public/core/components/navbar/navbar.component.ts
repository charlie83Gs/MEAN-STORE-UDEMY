import { IAuthData } from './../../../../@core/interface/session.interface';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '@core/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  session: IAuthData = {
    status: false
  };
  access : boolean =  false;
  role:string;
  userLabel = '';

  constructor(private authService: AuthService) { 
    this.authService.accessVar$.subscribe(
      (result) =>{
        this.session = result;
        this.access = result.status;
        this.role = result.user?.role;
          this.userLabel = `${capitalizeFirstLetter(result.user?.name)} ${capitalizeFirstLetter(result.user?.lastname)}` 
      }
    )
  }

  ngOnInit(): void {
  }

  logout(){
    //logout
    this.authService.removeSession();
  }

}


function capitalizeFirstLetter(str: string) {
  if(!str) return ""
  return str.charAt(0).toUpperCase() + str.slice(1);
}