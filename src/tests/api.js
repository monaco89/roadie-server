import axios from 'axios';

const API_URL = 'http://localhost:8000/graphql';

export const track = async variables =>
    axios.post(API_URL, {
        query: `
            query ($q: String!, $limit: String!) {
                searchTracks(q: $q, limit: $limit) {
                    tracks {
                        items {
                            artists {
                                name
                            }
                            name
                        }
                    }
                }
            }
        `,
        variables,
    });