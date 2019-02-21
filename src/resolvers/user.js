import { AuthenticationError, UserInputError } from 'apollo-server';
import jwt from 'jsonwebtoken';

const createToken = async (user, secret, expiresIn) => {
  const { id, email } = user;
  return await jwt.sign({ id, email }, secret, { expiresIn });
};

export default {
  Query: {
    user: async (parent, { id }, { models }) => {
      return await models.User.findByPk(id);
    },
    me: async (parent, args, { models, me }) => {
      if (!me) {
        return null;
      }

      return await models.User.findByPk(me.id);
    },
  },

  Mutation: {
    signUp: async (
      parent,
      { username, email, password },
      { models, secret },
    ) => {
      const user = await models.User.create({
        email,
        password,
      });

      // TODO Email verification
      // After signup, automatically signin
      return { token: createToken(user, secret, '1h') };
    },

    signIn: async (
      parent,
      { login, password },
      { models, secret },
    ) => {
      const user = await models.User.findByLogin(login);

      if (!user) {
        throw new UserInputError(
          'No user found with these login credentials.',
        );
      }

      const isValid = await user.validatePassword(password);

      if (!isValid) {
        throw new AuthenticationError(
          'No user found with these login credentials.',
        );
      }

      return { token: createToken(user, secret, '1h') };
    },

    confirm: async (parent, { id }, { models, secret }) => {
      // TODO Set confirm
    },
  },
};
