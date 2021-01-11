import { IRegisterForm } from './../../@core/interface/register.interface';
import { LOGIN_QUERY, USER_LIST_QUERY, AUTH_DATA_QUERY } from './../operations/query/user';
import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import {map} from 'rxjs/operators';
import { DocumentNode } from 'graphql';
import { REGISTER_USER_MUTATION } from '../operations/mutation/user';

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


  protected set(mutation: DocumentNode, variables: Object = {}, context: object = {}){
    return this.apollo.mutate({
      mutation,
      variables,
      context
    }).pipe(
      map(
        (result) => {
          return result.data;
        }
      )
    )
  }


}
