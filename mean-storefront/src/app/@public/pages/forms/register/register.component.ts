import { IRegisterForm } from './../../../../@core/interface/register.interface';
import { Component, OnInit } from '@angular/core';
import { UsersService } from '@core/services/users.service';
import { basicAlert } from 'src/app/@shared/alerts/toasts';
import { ALERT_TYPE } from 'src/app/@shared/alerts/values.config';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  newUser : IRegisterForm = {
    id: "",
    name: "",
    lastname: "",
    email: "",
    password: "",
    birthday: ''
  };

  constructor(private userService : UsersService, private router:Router) { }

  ngOnInit(): void {
    var date = new Date();
    date.setFullYear( date.getFullYear() - 18 );
    this.newUser.birthday = date.toISOString();
  }
  asignBirthday($event){
    const birthday = new Date($event.year, $event.month, $event.day, 0, 0, 0, 0);
    this.newUser.birthday = birthday.toISOString();
  }

  registerUser(){
    console.log(this.newUser)
    this.userService.register(this.newUser).subscribe(
      (result) => {
        if(result.status){
          basicAlert(ALERT_TYPE.SUCCESS,result.message);
          this.router.navigate(["/login"])
        }else{
          basicAlert(ALERT_TYPE.WARNING,result.message);
        }
      }
    )
  }

}
