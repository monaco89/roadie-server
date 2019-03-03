export default {
  Query: {
    likes: async (parent, { lid, uid, type }, { models }) => {
      return models.Likes.findAll({
        where: {
          lid: lid,
          uid: uid,
          type: type,
        },
      });
    },
  },
  Like: {
    user: async (like, args, { models }) => {
      return await models.user.findByPk(like.uid);
    },
  },
};
