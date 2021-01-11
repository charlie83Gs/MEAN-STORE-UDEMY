import { IAuthData, ISession } from './../interface/session.interface';
import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { AUTH_DATA_QUERY, LOGIN_QUERY } from 'src/app/@graphql/operations/query/user';
import { ApiService } from 'src/app/@graphql/services/api.service';
import {map} from 'rxjs/operators';
import { Subject } from 'rxjs';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends ApiService {
  private accessVar = new Subject<IAuthData>();
  accessVar$ = this.accessVar.asObservable();
  
  constructor(apollo : Apollo) { 
      super(apollo);
  }

  updateSession(newValue: IAuthData){
    this.accessVar.next(newValue);
    console.log("session updates")
  }

  //methos to use graphql api
  login (email:string, password:string) {
    let variables = {
      email,
      password,
      dates:false
    };
    return this.get(LOGIN_QUERY, variables).pipe(
      map(
        (result:any) => {
          return result.login;
        }
      )
    );
  }

  validateSession () {
    //dates should be false as the token does not contain birthday or register date information
    let variables = {
      dates: false
    };
    let context = {
      headers: {
        Authorization: this.getSession().token
      }
    }
    return this.get(AUTH_DATA_QUERY, variables, context).pipe(
      map(
        (result:any) => {
          return result.auth;
        }
      )
    );
  }

  setSession(token:string, expiresTimeInHours =24){
    const date = new Date();
    date.setHours(date.getHours() + expiresTimeInHours);
    
    const session : ISession= {
      expiresIn: new Date(date).toISOString(),
      token: token
    };

    localStorage.setItem('session',JSON.stringify(session))
    //validate session after session update
    this.isLogged()
  }

  getSession(){
    const session = localStorage.getItem('session');
    return JSON.parse(session) as ISession;
  }

  removeSession(){
    localStorage.removeItem('session');
    this.updateSession({
      status: false
    });
  }

  isLogged(){
    if(this.getSession() !== null){
      this.validateSession().subscribe(
        (result : IAuthData) =>{
          if(!result.status){
            this.removeSession()
            return
          }
          this.updateSession(result)
          return
        }
      );
    }else{
      this.updateSession({
        status: false
      });
    }
  }
  
}
