import { ITableColumns } from './../../../@core/interface/table-columns';
import { Component, OnInit } from '@angular/core';
import { IResultData } from '@core/interface/result-data';
import { GENRE_LIST_QUERY } from '@graphql/operations/query/genres';
import { DocumentNode } from 'graphql';

@Component({
  selector: 'app-genres',
  templateUrl: './genres.component.html',
  styleUrls: ['./genres.component.scss']
})
export class GenresComponent implements OnInit {
  query : DocumentNode = GENRE_LIST_QUERY;
  context: object;
  items: number;
  resultData: IResultData;
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
      key:'slug',
      label:'Slug'
    },
    ];

  constructor() { }

  ngOnInit(): void {
    this.context = {}
    this.items = 10;
    this.resultData = {
      listKey:'genres',
      definitionKey: 'genres'
    };
  }

}
