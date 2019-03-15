# roadie-server

This is the server for [That Concert Fire UI](https://github.com/monaco89/roadie)

This project is a Node.js with Express & MySQL + Apollo Server server

To query spotify's REST API, [Spotify Web API Node](https://github.com/thelinmichael/spotify-web-api-node) is installed. Then with custom resolvers and GraphQL schema, this is a GraphQL wrapper for the [Spotify API](https://developer.spotify.com/web-api/).

To query Setlist.fm's REST API, [Setlist.fm API Wrapper for Node.js](https://github.com/terhuerne/setlistfm-js) is installed.

Also uses the ORM [Sequelize](https://github.com/sequelize/sequelize) to manage the MySQL database

## Highlights

- Search for Tracks on Spotify using GraphQL
- Search for Events + Setlists on [Setlist.fm](https://api.setlist.fm/docs/1.0/index.html)
- Run multiple search queries against the Spotify API with one GraphQL query
- User Sign Up and Sign In
- Authentication using [JWT](https://jwt.io/)
- Batch queries with [Facebook Data Loader](https://github.com/facebook/dataloader)

## To Use

1. `yarn install`
2. `yarn start`

## Testing

Testing with [Mocha](http://mochajs.org/) and [Chai](https://www.chaijs.com/)

`yarn test`
