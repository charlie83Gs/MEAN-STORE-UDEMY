import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private apollo: Apollo) { }

  //methos to use graphql api
  login (email:string, password:string) {}
  getUsers() {}
  validateToken () {}
  register(email:string, password:string, name: string, lastname:string, birthday:string ){}
}
