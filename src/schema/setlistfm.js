import { gql } from 'apollo-server-express';

export default gql`
  extend type Query {
    getSetlist(id: String!): Setlist!
  }

  type Setlist {
    artist: Artist!
    venue: Venue!
    url: String!
    id: String!
    eventDate: String!
    tour: Tour!
    sets: Sets!
  }

  type Artist {
    mbid: String!
    name: String!
    sortName: String!
  }

  type Venue {
    city: City!
    name: String!
  }

  type Tour {
    name: String!
  }

  type Sets {
    set: [Set!]
  }

  type Set {
    name: String!
    encore: Int
    song: [Song!]!
  }

  type City {
    id: String!
    name: String!
    stateCode: String!
    state: String!
  }

  type Song {
    name: String!
    cover: Cover
  }

  type Cover {
    name: String!
    sortName: String!
    mbid: String!
  }
`;
