import { RESULT_PAGINATION_FRAGMENT } from './../fragment/result-pagination';
import gql from 'graphql-tag';
import { USER_FRAGMENT } from '@graphql/operations/fragment/user';


export const LOGIN_QUERY = gql`
  query getLogin($email: String!, $password: String!,$dates: Boolean!)  {
    login(email:$email,password:$password) {
        status
        message
        token
        user{
     	  ...UserObject
      }
    }
  }
  ${ USER_FRAGMENT }
`;

export const USER_LIST_QUERY = gql`
  query usersList($dates: Boolean!, $page: Int, $items: Int){
    users(page: $page, items: $items){
      status
      message
      users{
     	  ...UserObject
      }
      pagination{
        ... ResultPaginationObject
      }
    }
  }
  ${ USER_FRAGMENT }
  ${ RESULT_PAGINATION_FRAGMENT }
`;


export const AUTH_DATA_QUERY = gql`
query authData($dates: Boolean!){
  auth {
    status
    message
    user{
      ...UserObject
    }
  }
}
${ USER_FRAGMENT }
`;

