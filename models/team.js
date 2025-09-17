"use strict";
export const Team = (sequelize, DataTypes) => {
  const Team = sequelize.define(
    "Team",
    {
      nombre: DataTypes.STRING,
      apellido: DataTypes.STRING,
      email: DataTypes.STRING,
      profesion: DataTypes.STRING,
      experiencia: DataTypes.STRING,
      foto: DataTypes.STRING,
      estado: DataTypes.STRING,
    },
    {
      tableName: "miembros_equipo",
      timestamps: false,
    }
  );
  return Team;
};
