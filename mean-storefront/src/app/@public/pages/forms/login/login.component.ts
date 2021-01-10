import { ILoginForm, IResultLogin } from './../../../../@core/interface/login.interface';
import { Component } from '@angular/core';
import { AuthService } from 'src/app/@core/services/auth.service';
import { basicAlert } from 'src/app/@shared/alerts/toasts';
import { ALERT_TYPE } from 'src/app/@shared/alerts/values.config';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  login: ILoginForm = {
    email: '',
    password: ''
  };

  constructor(private auth : AuthService) { }

  submit(){
    this.auth.login(this.login.email,this.login.password).subscribe(
      (result:IResultLogin) => {
        if(result.status && result.token) {
          basicAlert(ALERT_TYPE.SUCCESS,result.message);
          this.auth.setSession(result.token);
          return
        }
        basicAlert(ALERT_TYPE.WARNING,result.message);

      }
    )
  }

}
