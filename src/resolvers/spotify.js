export default {
    Query: {
        searchTracks: async (parent, { q, limit }, { models }) => {
            return await models.searchTracks(`track:${q}`, { limit: limit })
                .then(function (data) {
                    return data.body;
                }, function (err) {
                    console.error(err);
                });


        }
    },
};
