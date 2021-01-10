import gql from "graphql-tag";

export const REGISTER_MUTATION= gql`
  mutation addUser($user: UserInput!) {
  register(user: $user) {
    status,
  	message,
    user{
      id
      name
      lastname
      registerDate
      email
    }
  }
}

`;