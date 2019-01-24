export default {
    Query: {
        searchTracks: async (
            parent,
            { q, limit },
            { models }
        ) => {
            const tracks = await models.searchTracks(`track:${q}`, { limit: limit });

            return tracks.body;
        },
        searchMultipleTracks: async (
            parent,
            { q, limit = 1 },
            { models }
        ) => {
            // Loop through each q
            let tracks = [];
            for (const query of q) {
                // use searchTracks query for each q
                const t = await models.searchTracks(`track:${query}`, { limit: limit });
                tracks.push(t.body);
            }

            let totalScores = 0;
            // total popularity of all tracks
            tracks.forEach((track) => {
                totalScores += track.tracks.items[0].popularity;
            });

            const rating = totalScores / q.length;

            tracks.meta = { rating: rating };

            return tracks;
        },
    },
};
