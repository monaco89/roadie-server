import { gql } from 'apollo-server-express';

import spotifySchema from './spotify';
import setlistfm from './setlistfm';
import userSchema from './user';
import likesSchema from './likes';

const linkSchema = gql`
  type Query {
    _: Boolean
  }

  type Mutation {
    _: Boolean
  }
`;

export default [
  linkSchema,
  spotifySchema,
  userSchema,
  likesSchema,
  setlistfm,
];
