import { gql } from 'apollo-server-express';

export default gql`
  extend type Query {
    album(id: ID!): Album
    searchTracks(q: String!): SearchResults! 
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
    
  }

  type Image {
      url: String!
  }
`;
