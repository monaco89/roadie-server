import { gql } from 'apollo-server-express';

import spotifySchema from './spotify';
import userSchema from './user';

const linkSchema = gql`
    type Query {
        _: Boolean
    }

    type Mutation {
        _: Boolean
    }
`;

export default [linkSchema, spotifySchema, userSchema];