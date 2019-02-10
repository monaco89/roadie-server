import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import { ApolloServer, AuthenticationError } from 'apollo-server-express';
import morgan from 'morgan';
import jwt from 'jsonwebtoken';
import http from 'http';

import schema from './schema';
import resolvers from './resolvers';
import models, { sequelize } from './models';

const app = express();

app.use(cors());

app.use(morgan('dev'));

const getMe = async req => {
    const token = req.headers['x-token'];

    if (token) {
        try {
            return await jwt.verify(token, process.env.SECRET);
        } catch (e) {
            throw new AuthenticationError(
                'Your session expired. Sign in again.',
            );
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
        };
    },
});

server.applyMiddleware({ app, path: '/graphql' });

const eraseDatabaseOnSync = true;

const port = process.env.PORT || 8000;

sequelize.sync({ force: eraseDatabaseOnSync }).then(async () => {
    if (eraseDatabaseOnSync) {
        createTestUsers();
    }

    app.listen({ port }, () => {
        console.log(`Server on http://localhost:${port}/graphql`);
    });

});

const createTestUsers = async => {
    await models.User.create(
        {
            email: "nickmonaco@nickmonaco.com",
            password: "pass",
        }
    );
}

