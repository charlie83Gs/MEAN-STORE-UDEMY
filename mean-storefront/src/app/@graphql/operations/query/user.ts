import gql from 'graphql-tag';
import { USER_FRAGMENT } from '@graphql/operations/fragment/user';


export const LOGIN_QUERY = gql`
  query getLogin($email: String!, $password: String!)  {
    login(email:$email,password:$password) {
        status
        message
        token
    }
  }
`;

export const USER_LIST_QUERY = gql`
  query usersList($dates: Boolean!){
    users{
      status
      message
      users{
     	  ...UserObject
      }
    }
  }
  ${ USER_FRAGMENT }
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

