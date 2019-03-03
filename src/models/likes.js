const likes = (sequelize, DataTypes) => {
  const Likes = sequelize.define('likes', {
    lid: {
      type: DataTypes.String,
      allowNull: false,
    },
    uid: {
      type: DataTypes.String,
      allowNull: false,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  Likes.associate = models => {
    Likes.belongsTo(models.User);
  };

  return Likes;
};

export default likes;
