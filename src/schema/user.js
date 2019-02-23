import { gql } from 'apollo-server-express';

export default gql`
  extend type Query {
    user(id: ID!): User
    me: User
  }

  extend type Mutation {
    signUp(email: String!, password: String!): Token!

    signIn(login: String!, password: String!): Token!

    confirm(id: String!): EmailMessage
  }

  type Token {
    token: String!
  }

  type User {
    id: ID!
    email: String!
  }

  type EmailMessage {
    msg: String!
  }
`;
