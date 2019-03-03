import { combineResolvers } from 'graphql-resolvers';
import { isAuthenticated, isLikeOwner } from './authorization';

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
  Mutation: {
    liked: combineResolvers(
      isAuthenticated,
      async (parent, { lid, type }, { models, me }) => {
        const like = await models.Likes.create({
          lid,
          uid: me.id,
          type: type,
        });

        return like;
      },
    ),
    disliked: combineResolvers(
      isAuthenticated,
      isLikeOwner,
      async (parent, { lid }, { models }) => {
        return await models.Likes.destory({ where: { lid } });
      },
    ),
  },
  Like: {
    user: async (like, args, { models }) => {
      return await models.user.findByPk(like.uid);
    },
  },
};
