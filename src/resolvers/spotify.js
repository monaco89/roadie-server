export default {
  Query: {
    searchTracks: async (parent, { q, limit }, { models }) => {
      const tracks = await models.Spotify.searchTracks(`track:${q}`, {
        limit: limit,
      });

      return tracks.body;
    },
    searchMultipleTracks: async (
      parent,
      { q, limit = 1 },
      { models },
    ) => {
      // Loop through each q
      let tracks = [];
      for (const query of q) {
        // Use searchTracks query for each q
        const t = await models.Spotify.searchTracks(
          `track:${query}`,
          { limit: limit },
        );
        if (t.body.tracks.items.length !== 0) {
          tracks.push(t.body);
        }
      }

      // TODO Make 'rating' an Int
      // TODO Clean up

      let totalScores = 0;
      // Total popularity of all tracks
      tracks.forEach(track => {
        totalScores += track.tracks.items[0].popularity;
      });

      // Get the average rating
      const rating = totalScores / q.length;

      tracks.forEach(track => {
        track.meta = { rating: String(rating) };
        // Get spotify external url
        track.tracks.items[0].spotify_url =
          track.tracks.items[0].external_urls.spotify;
      });

      return tracks;
    },
  },
  // Meta: {
  //     rating: async (meta, args, { models }) => {
  //         return await "100";
  //     },
  // },
};
