import { Injectable, Input } from '@angular/core';
import { ApiService } from '@graphql/services/api.service';
import { Apollo } from 'apollo-angular';
import { DocumentNode } from 'graphql';

@Injectable({
  providedIn: 'root'
})


export class TablePaginationService extends ApiService {
  constructor(apollo: Apollo) { 
    super(apollo);
  }

  getCollectionData(query: DocumentNode, variables: object ={}, context: {}){
    return this.get(query,variables,context)
  }
}
