import { gql } from '@apollo/client';

export const GET_AUTHORIZATION_TOKEN = gql`
  query {
    generateAuthorizationToken {
      message
      status
      token
    }
  }
`;