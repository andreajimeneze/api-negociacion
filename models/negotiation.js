"use strict";
export const Negotiation = (sequelize, DataTypes) => {
  const Negotiation = sequelize.define("Negotiation", {
    cliente_id: DataTypes.INTEGER,
    trabajadores_cubiertos: DataTypes.INTEGER,
    fecha_negociacion: DataTypes.DATE
  }, 
  {
    tableName: 'negociaciones',
    timestamps: false
  }
);

 Negotiation.associate = (models) => {
    Negotiation.belongsTo(models.client, {
      foreignKey: 'cliente_id',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });
  };

  return Negotiation;
};
