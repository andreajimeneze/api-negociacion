'use strict'
export const User = ( sequelize, DataTypes ) => {
    const User = sequelize.define('Users', {
        nombre : DataTypes.STRING,
        email : DataTypes.STRING,
        contrasenia : DataTypes.STRING,
        rol : DataTypes.STRING
    }, {
        tableName : 'usuarios',
        timestamps : false
    });
    return User;
}