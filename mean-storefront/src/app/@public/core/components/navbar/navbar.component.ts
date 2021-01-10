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

  constructor(private authService: AuthService) { 
    this.authService.accessVar$.subscribe(
      (result) =>{
        this.session = result;

        this.access = result.status;
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
