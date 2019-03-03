import { combineResolvers } from 'graphql-resolvers';
import { isAuthenticated, isLikeOwner } from './authorization';

export default {
  Query: {
    likes: async (parent, { lid, userId, type }, { models }) => {
      return models.Likes.findAll({
        where: {
          lid: lid,
          userId: userId,
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
          userId: me.id,
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
    user: async (like, args, { loaders }) => {
      // Load function will batch all identifiers into one set
      // and request all users at the same time.
      return await loaders.user.load(like.userId);
    },
  },
};
