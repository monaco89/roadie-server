import { gql } from 'apollo-server-express';

export default gql`
  extend type Query {
    searchTracks(q: String!, limit: String!): SearchResults! 
  }

  type Album {
    href: String!
    artist: Artists!
    images: [Image]!
  }

  type Artists {
      name: String!
  }

  type SearchResults {
      tracks: Tracks!
  }

  type Tracks {
      href: String!
      items: [Item!]
  }

  type Item {
    album: Album!
    artists: [Artists!]
    id: String!
    href: String!
    name: String!
    popularity: Int!
    
  }

  type Image {
      url: String!
  }
`;
