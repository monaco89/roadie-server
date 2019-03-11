export default {
  Query: {
    getSetlist: async (parent, { id }, { models }) => {
      const setlist = await models.Setlistfm.getSetlist(id);
      console.log(setlist.sets.set[0].song);
      return setlist;
    },
  },
};
