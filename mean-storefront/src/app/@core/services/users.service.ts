import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { USER_LIST_QUERY } from 'src/app/@graphql/operations/query/user';
import { ApiService } from 'src/app/@graphql/services/api.service';
import {map} from 'rxjs/operators';
import { IRegisterForm } from '@core/interface/register.interface';
import { REGISTER_USER_MUTATION } from '@graphql/operations/mutation/user';

@Injectable({
  providedIn: 'root'
})
export class UsersService extends ApiService{

  constructor(apollo : Apollo) { 
      super(apollo);
  }

  getUsers(page: number =1, items:number =20) {
    let variables = {
      dates: true,
      page,
      items
    };
    return this.get(USER_LIST_QUERY, variables).pipe(
      map(
        (result:any) => {
          return result.users;
        }
      )
    );
  }

  register(user : IRegisterForm){
    let variables = {
      user,
      dates:false
    };
    return this.set(REGISTER_USER_MUTATION,variables).pipe(
      map(
        (result:any) => {
          return result.register;
        }
      )
    );
  }
}
