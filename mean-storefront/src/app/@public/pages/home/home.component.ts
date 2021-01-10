import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/@core/services/auth.service';
import { UsersService } from 'src/app/@core/services/users.service';
import { ApiService } from 'src/app/@graphql/services/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private auth: AuthService, private users: UsersService) { }

  ngOnInit(): void {
    this.auth.login("charlie@gmail.com","1234").subscribe(
      result => {
        console.log(JSON.stringify(result));
      }
    )

    this.users.getUsers().subscribe(
      result => {
        console.log(JSON.stringify(result));
      }
    )
    this.auth.validateSession().subscribe(
      result => {
        console.log(JSON.stringify(result));
      }
    )
    
    // this.api.register(
    //   "francis@gmail.com",
    //   "1234",
    //   "francis",
    //   "cartago",
    //   "20-01-1985"
    // ).subscribe(
    //   result => {
    //     console.log(JSON.stringify(result));
    //   }
    // )
  }

}
