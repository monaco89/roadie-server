import { gql } from 'apollo-server-express';

import spotifySchema from './spotify';

const linkSchema = gql`
    type Query {
        _: Boolean
    }
`;

export default [linkSchema, spotifySchema];