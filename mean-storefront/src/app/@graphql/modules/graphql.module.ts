import {Apollo, ApolloModule} from 'apollo-angular';
import {HttpLink, HttpLinkModule} from 'apollo-angular-link-http';
import { NgModule } from '@angular/core';
import { onError } from 'apollo-link-error';
import { ApolloLink } from 'apollo-link';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpClientModule } from '@angular/common/http';



@NgModule({
  imports: [
    HttpClientModule,
    ApolloModule,
    HttpLinkModule
  ]
})
export class GraphqlModule { 
  constructor (apollo: Apollo, httpLink : HttpLink){

    //catch erros
    const errorLink = onError(
      ({graphQLErrors, networkError}) => {
        if(graphQLErrors){
          console.log('Grahql Error',graphQLErrors );
        }
        if(networkError){
          console.log('Network Error',networkError );
        }
      }
    );

    const uri = 'http://167.71.184.84/graphql';
    const link = ApolloLink.from(
      [
        errorLink,
        httpLink.create({uri})
      ]
    );
    apollo.create({
      link,
      cache: new InMemoryCache()
    });
  }

}
