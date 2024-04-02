import { gql } from "@apollo/client";

export const CREATE_USER = gql`
  mutation createUser(
    $first_name: String!,
    $last_name: String!,
    $email: String!,
    $phone: String!,
    $password: String!,
    $role_id: Int!
  ) {
    createUser(
      createUserData: {
        first_name: $first_name,
        last_name: $last_name,
        email: $email,
        phone: $phone,
        password: $password,
        role_id: $role_id
      }
    ) {
      first_name
      last_name
      email
      phone
      role_id
    }
  }
`;
