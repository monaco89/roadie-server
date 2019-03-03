import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import {
  ApolloServer,
  AuthenticationError,
} from 'apollo-server-express';
import morgan from 'morgan';
import jwt from 'jsonwebtoken';
import DataLoader from 'dataloader';
// import http from 'http';

import schema from './schema';
import resolvers from './resolvers';
import models, { sequelize } from './models';
import loaders from './loaders';

const app = express();

app.use(cors());

app.use(morgan('dev'));

const getMe = async req => {
  const token = req.headers['x-token'];

  if (token) {
    try {
      return await jwt.verify(token, process.env.SECRET);
    } catch (e) {
      // TODO Fix Error, was breaking site, throws 400 error
      // throw new AuthenticationError(
      //     'Your session expired. Sign in again.',
      // );
    }
  }
};

const server = new ApolloServer({
  typeDefs: schema,
  resolvers,
  formatError: error => {
    const message = error.message
      .replace('SequelizeValidationError: ', '')
      .replace('Validation error: ', '');

    return {
      ...error,
      message,
    };
  },
  context: async ({ req }) => {
    const me = await getMe(req);

    return {
      models,
      me,
      secret: process.env.SECRET,
      loaders: {
        user: new DataLoader(keys =>
          loaders.user.batchUsers(keys, models),
        ),
      },
    };
  },
});

server.applyMiddleware({ app, path: '/graphql' });

// const eraseDatabaseOnSync = true;

const isTest = !!process.env.TEST_DATABASE;
// const isProduction = !!process.env.DATABASE_URL;

const port = process.env.PORT || 8000;

sequelize.sync({ force: isTest }).then(async () => {
  if (isTest) {
    createTestUsers();
  }

  app.listen({ port }, () => {
    console.log(`Server on http://localhost:${port}/graphql`);
  });
});

const createTestUsers = async () => {
  await models.User.create({
    email: 'nickmonaco@nickmonaco.com',
    password: 'password4321',
  });
};
