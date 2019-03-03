import { gql } from 'apollo-server-express';

export default gql`
  extend type Query {
    likes(lid: String, userId: String, type: String!): [Like!]
    like(lid: String!): Like
    topRated(id: String, type: String!): [Tracks!]
  }

  extend type Mutation {
    liked(lid: String!, type: String!): Like!
    disliked(lid: String!): Boolean!
  }

  type Like {
    lid: String!
    user: User!
    type: String!
    #createdAt: Date!
  }
`;
