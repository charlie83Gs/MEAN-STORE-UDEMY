import gql from "graphql-tag";
import { USER_FRAGMENT } from '@graphql/operations/fragment/user';

export const REGISTER_USER_MUTATION= gql`
  mutation addUser($user: UserInput!,$dates: Boolean!) {
  register(user: $user) {
    status,
  	message,
    user{
      ...UserObject
    }
  }
}
${ USER_FRAGMENT }

`;