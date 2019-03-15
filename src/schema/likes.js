import { gql } from 'apollo-server-express';

export default gql`
  extend type Query {
    likes(lid: String, userId: String, type: String!): [Like!]
    like(lid: String!): Like
    # // ? Why need an id
    topRated(id: String, type: String!): [Result!]
  }

  extend type Mutation {
    liked(lid: String!, type: String!): Like!
    disliked(lid: String!): Boolean!
  }

  type Like {
    lid: String!
    user: User!
    type: String!
  }

  type Result {
    id: String!
    date: String!
    artist: Artist!
    name: String!
    album: Album!
  }
`;
