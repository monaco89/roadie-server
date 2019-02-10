# thatconcertfire-server

This is the server for [That Concert Fire UI](https://github.com/monaco89/thatconcertfire)

This project is a Node.js with Express + Apollo Server server 

To query spotify's REST API, [Spotify Web API Node](https://github.com/thelinmichael/spotify-web-api-node) is installed. Then with custom resolvers and GraphQL schema, this is a GraphQL wrapper for the [Spotify API](https://developer.spotify.com/web-api/).

## To Use

1. `yarn install`
2. `yarn start`

## Testing

Testing with [Mocha](http://mochajs.org/) and [Chai](https://www.chaijs.com/)

`yarn test`