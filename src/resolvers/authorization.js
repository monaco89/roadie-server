import { ForbiddenError } from 'apollo-server';
import { skip } from 'graphql-resolvers';

export const isAuthenticated = (parent, args, { me }) =>
  me ? skip : new ForbiddenError('Not authenticated as user.');

export const isLikeOwner = async (
  parent,
  { lid },
  { models, me },
) => {
  const like = await models.Likes.findAll({
    where: { lid: lid, userId: me.userId },
  });
  // TODO Fix this, it doesn't make sense since we are querying with me.userId
  if (like.userId !== me.id) {
    throw new ForbiddenError('Not authenticated as owner.');
  }

  return skip;
};
