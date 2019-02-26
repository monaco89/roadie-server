const likes = (sequelize, DataTypes) => {
  const Likes = sequelize.define('likes', {
    id: {
      type: DataTypes.String,
      allowNull: false,
    },
    uid: {
      type: DataTypes.ID,
      allowNull: false,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  return Likes;
};

export default likes;
