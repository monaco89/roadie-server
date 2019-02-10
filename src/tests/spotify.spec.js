import { expect } from 'chai';

import * as spotifyApi from './api';

// Testing Spotify GraphQL track query
describe('spotify tracks', () => {
    describe('searchTracks(q: $q, limit: $limit): SearchResults', () => {
        it('returns a spotify query on the search parameters', async () => {
            const expectedResult = {
                data: {
                    searchTracks: {
                        tracks: {
                            items: [
                                {
                                    artists: [
                                        {
                                            "name": "Zac Brown Band",
                                        }
                                    ],
                                    "name": "Homegrown",
                                }
                            ],
                        },
                    },
                }
            };

            const result = await spotifyApi.track({ q: 'homegrown zac brown band', limit: '1' });

            expect(result.data).to.eql(expectedResult);
        })
    });
});