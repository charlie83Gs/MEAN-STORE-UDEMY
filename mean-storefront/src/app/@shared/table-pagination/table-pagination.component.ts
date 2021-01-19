import { ITableColumns } from './../../@core/interface/table-columns';
import { IResultData, IPaginationInfo } from './../../@core/interface/result-data';
import { USER_LIST_QUERY } from 'src/app/@graphql/operations/query/user';
import { TablePaginationService } from './table-pagination.service';
import { Component, Input, OnInit } from '@angular/core';
import { DocumentNode } from 'graphql';
import { map } from 'rxjs/internal/operators/map';
import { Observable } from 'rxjs/internal/Observable';

@Component({
  selector: 'app-table-pagination',
  templateUrl: './table-pagination.component.html',
  styleUrls: ['./table-pagination.component.scss']
})
export class TablePaginationComponent implements OnInit {
  @Input() query: DocumentNode = USER_LIST_QUERY;
  @Input() context: object;
  @Input() items = 20;
  @Input() dates = false;
  @Input() resultData: IResultData;
  @Input() columns: Array<ITableColumns> = [
    {
      key:'id',
      label:'ID'
    },
    {
      key:'name',
      label:'Name'
    }
  ]
  paginationInfo: IPaginationInfo;
  objects : Array<object>= [];
  data$ :Observable<any>;

  constructor(private paginationService: TablePaginationService) { }

  ngOnInit(): void {
    if(this.query === undefined){
      throw new Error("Undefined query  at table-pagination component")
    };
    if(this.resultData === undefined){
      throw new Error("Undefined resultData the keys used to extract data from graphql results must be provided")
    };
    if(this.columns === undefined){
      throw new Error("Undefined columns pleas especify the columns and labels to be displayed in the table")
    };
    this.paginationInfo = {
      page: 1,
      pages: 1,
      items: this. items,
      total: 1
    }
    this.loadData();
  }

  isDate(value : string){
    // console.log(Date.parse(value) )
    return !isNaN(Date.parse(value));
  }

  dateToString(value:string){
    var date = new Date(value)
    return date.toLocaleDateString();
  }

  changePage(){
    this.loadData();
  }

  loadData(){
    const variables = {
      page: this.paginationInfo.page,
      items: this.paginationInfo.items,
      dates:  this.dates,
    }
    this.data$ = this.paginationService.getCollectionData(this.query, variables, {}).pipe(
      map((
        result: any) =>{
          const data = result[this.resultData.definitionKey];
          this.paginationInfo = data["pagination"]
          return data[this.resultData.listKey]
      })
    );

    // this.paginationService.getCollectionData(this.query, variables, {}).subscribe(
    //   (result : any) => {
    //     console.log(result);
    //     this.objects = result.users.users;
    //     this.paginationInfo = result.users.pagination;
    //     return result.users
    //   }
    // )
  }

}
