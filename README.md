# roadie-server

This is the server for [That Concert Fire UI](https://github.com/monaco89/roadie)

This project is a Node.js with Express & MySQL + Apollo Server server 

To query spotify's REST API, [Spotify Web API Node](https://github.com/thelinmichael/spotify-web-api-node) is installed. Then with custom resolvers and GraphQL schema, this is a GraphQL wrapper for the [Spotify API](https://developer.spotify.com/web-api/).

Also uses the ORM [Sequelize](https://github.com/sequelize/sequelize) to manage the MySQL database

## Highlights

* Search for Tracks on Spotify using GraphQL
* Run multiple search queries against the Spotify API with one GraphQL query
* User Sign Up and Sign In
* Authentication using [JWT](https://jwt.io/)

## To Use

1. `yarn install`
2. `yarn start`

## Testing

Testing with [Mocha](http://mochajs.org/) and [Chai](https://www.chaijs.com/)

`yarn test`