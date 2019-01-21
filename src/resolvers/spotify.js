export default {
    Query: {
        album: async (parent, { id }, { models }) => {
            return await models.getArtistAlbums(id).then(
                function (data) {
                    return data.body;
                },
                function (err) {
                    console.error(err);
                }
            );
        },
        searchTracks: async (parent, { q }, { models }) => {
            return await models.searchTracks(`track:${q}`)
                .then(function (data) {
                    return data.body;
                }, function (err) {
                    console.error(err);
                });


        }
    },
};
