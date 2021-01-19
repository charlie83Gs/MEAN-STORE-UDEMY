import { USER_LIST_QUERY } from './../../../@graphql/operations/query/user';
import { Component, OnInit } from '@angular/core';
import { IResultData } from '@core/interface/result-data';
import { DocumentNode } from 'graphql';
import { ITableColumns } from '@core/interface/table-columns';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  query : DocumentNode = USER_LIST_QUERY;
  context: object;
  items: number;
  resultData: IResultData;
  dates: boolean;
  // columns = ['id', 'name', 'lastname', 'email', 'registerDate'];
  columns : Array<ITableColumns> = [
    {
      key:'id',
      label:'ID'
    },
    {
      key:'name',
      label:'Name'
    },
    {
      key:'lastname',
      label:'Lastname'
    },
    {
      key:'email',
      label:'Email'
    },
    {
      key:'role',
      label:'Role'
    }
    ];

  constructor() { }

  ngOnInit(): void {
    this.context = {}
    this.items = 10;
    this.resultData = {
      listKey:'users',
      definitionKey: 'users'
    };
    this.dates = true
  }

}
