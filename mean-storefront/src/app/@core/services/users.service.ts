import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { USER_LIST_QUERY } from 'src/app/@graphql/operations/query/user';
import { ApiService } from 'src/app/@graphql/services/api.service';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UsersService extends ApiService{

  constructor(apollo : Apollo) { 
      super(apollo);
  }

  getUsers() {
    let variables = {
      dates: true
    };
    return this.get(USER_LIST_QUERY, variables).pipe(
      map(
        (result:any) => {
          return result.users;
        }
      )
    );
  }
}
