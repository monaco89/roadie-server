import { gql } from 'apollo-server-express';

export default gql`
  extend type Query {
    likes(lid: String, uid: String, type: String!): [Likes!]
  }

  type Likes {
    lid: String!
    user: User!
    type: String!
  }
`;
