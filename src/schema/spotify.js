import { gql } from 'apollo-server-express';

export default gql`
  extend type Query {
    searchTracks(q: String!, limit: String!): SearchResults!
    searchMultipleTracks(q: [String!]): [SearchResults!]
  }

  type Album {
    href: String!
    artist: Artists!
    images: [Image]!
    name: String!
  }

  type Artists {
    name: String!
  }

  type SearchResults {
    tracks: Tracks!
    meta: Meta
  }

  # TODO Rename Tracks -> Track
  type Tracks {
    href: String!
    items: [Item!]
  }

  type Meta {
    rating: String!
  }

  type Item {
    album: Album!
    artists: [Artists!]
    id: String!
    href: String!
    name: String!
    popularity: Int
    duration_ms: Int
    spotify_url: String!
  }

  type Image {
    url: String!
  }
`;
