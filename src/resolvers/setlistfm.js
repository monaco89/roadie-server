export default {
  Query: {
    getSetlist: async (parent, { id }, { models }) => {
      return await models.Setlistfm.getSetlist(id);
    },
  },
};
