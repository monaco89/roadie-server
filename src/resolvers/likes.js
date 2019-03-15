import { ForbiddenError } from 'apollo-server';
import sequelize from 'sequelize';
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
    topRated: async (parent, { id, type }, { models }) => {
      if (type !== 'song' && type !== 'event') {
        throw new ForbiddenError('Wrong type.');
      }

      let likes;
      if (id) {
        likes = await models.Likes.findAll({
          where: {
            lid: id,
            type: type,
          },
          // TODO Get top count
          // attributes: [
          //   [
          //     'lid',
          //     [
          //       sequelize.fn('COUNT', sequelize.col('lid')),
          //       'count_lids',
          //     ],
          //   ],
          // ],
          // order: 'count_lids DESC',
        });
      } else {
        likes = await models.Likes.findAll({
          where: {
            type: type,
          },
          // TODO Get top count
          // attributes: [
          //   [
          //     'lid',
          //     [
          //       sequelize.fn('COUNT', sequelize.col('lid')),
          //       'count_lids',
          //     ],
          //   ],
          // ],
          // order: 'count_lids DESC',
        });
      }

      // Spotify query for track id
      let results = [];
      if (type === 'song') {
        for (const like of likes) {
          const response = await models.Spotify.getTracks([
            like.dataValues.lid,
          ]);

          results.push({
            id: response.body.tracks[0].id,
            date: response.body.tracks[0].album.release_date,
            artist: {
              name: response.body.tracks[0].artists[0].name,
              mbid: 'null',
              sortName: response.body.tracks[0].artists[0].name,
            },
            name: response.body.tracks[0].name,
          });
        }
      }

      // Query Setlist.fm for event info
      if (type === 'event') {
        for (const like of likes) {
          const response = await models.Setlistfm.getSetlist(
            like.dataValues.lid,
          );

          results.push({
            id: response.id,
            date: response.eventDate,
            artist: response.artist,
            name: response.tour.name,
          });
        }
      }

      return results;
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
