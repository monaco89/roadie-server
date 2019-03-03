import { ForbiddenError } from 'apollo-server';
import { skip } from 'graphql-resolvers';

export const isAuthenticated = (parent, args, { me }) =>
  me ? skip : new ForbiddenError('Not authenticated as user.');

export const isLikeOwner = async (parent, { id }, { models, me }) => {
  const like = await models.Likes.findByPk(id, { raw: true });

  if (like.uid !== me.id) {
    throw new ForbiddenError('Not authenticated as owner.');
  }

  return skip;
};
