import Sequelize from 'sequelize';
import spotifyApi from './spotify';

let sequelize;

if (process.env.DATABASE_URL) {
  sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'mysql',
  });
} else {
  sequelize = new Sequelize(
    process.env.TEST_DATABASE || process.env.DATABASE,
    process.env.DATABASE_USER,
    process.env.DATABASE_PASSWORD,
    {
      dialect: 'mysql',
    },
  );
}

const models = {
  Spotify: spotifyApi,
  User: sequelize.import('./user'),
};

// const models = spotifyApi;

Object.keys(models).forEach(key => {
  if ('associate' in models[key]) {
    models[key].associate(models);
  }
});

export { sequelize };

export default models;
