import { LOGIN_QUERY, USER_LIST_QUERY, AUTH_DATA_QUERY } from './../operations/query/user';
import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import {map} from 'rxjs/operators';
import { DocumentNode } from 'graphql';
import { REGISTER_MUTATION } from '../operations/mutation/user';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private apollo: Apollo) { }

  protected get(query: DocumentNode, variables: Object = {}, context: object = {}){
    return this.apollo.watchQuery({
      query: query,
      variables,
      context:context,
      fetchPolicy:'network-only'
    }).valueChanges.pipe (
      map((result) => {
        return result.data;
      })
    );
  }





  // register(email:string, password:string, name: string, lastname:string, birthday:string, role: string = "CLIENT"){
  //   let user = {
  //     id:"",
  //     email,
  //     password,
  //     name,
  //     lastname,
  //     birthday,
  //     role
  //   }

  //   let variables = {
  //     user
  //   };
  //   return this.get(REGISTER_MUTATION,variables);
  // }
}
