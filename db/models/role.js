'use strict';
module.exports = (sequelize, DataTypes) => {
  const Role = sequelize.define('Role', {
    role: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  Role.associate = models => {
    Role.hasMany(models.User);
  };
  return Role;
};