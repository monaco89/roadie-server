import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import { ApolloServer } from 'apollo-server-express';

import schema from './schema';
import resolvers from './resolvers';
// import models from './models';

const app = express();

app.use(cors());

var SpotifyWebApi = require('spotify-web-api-node');

var spotifyApi = new SpotifyWebApi({
    clientId: process.env.SPOTIFY_CLIENT_ID,
    clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
    redirectUri: process.env.SPOTIFY_DEVELOPMENT_REDIRECT_URI,
});

spotifyApi.clientCredentialsGrant()
    .then(function (data) {
        console.log('The access token expires in ' + data.body['expires_in']);
        console.log('The access token is ' + data.body['access_token']);
        spotifyApi.setAccessToken(data.body['access_token']);
    }, function (err) {
        console.log('Something went wrong when retrieving an access token', err);
    });

const server = new ApolloServer({
    typeDefs: schema,
    resolvers,
    context: {
        models: spotifyApi,
    },
});

server.applyMiddleware({ app, path: '/graphql' });

// app.get("/test", (req, res, next) => {
//     spotifyApi.getArtistAlbums('43ZHCT0cAZBISjO8DG9PnE').then(
//         function (data) {
//             return res.json(data.body);
//         },
//         function (err) {
//             console.error(err);
//         }
//     )
// });

const port = process.env.PORT || 8000;

app.listen({ port }, () => {
    console.log(`Server on http://localhost:${port}/graphql`);
});