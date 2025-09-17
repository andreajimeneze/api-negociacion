'use strict'
export const News = ( sequelize, dataTypes ) => {
    const News = sequelize.define('News', {
        titulo: dataTypes.STRING,
        resumen: dataTypes.STRING,
        texto: dataTypes.STRING,
        fecha_publicacion: dataTypes.DATE,
        fecha_edicion: dataTypes.DATE,
        url_imagen: dataTypes.STRING,
        slug: { 
            type: dataTypes.STRING,
            unique: true
        }
    }, {
        tableName: 'noticias',
        timestamps: false
    })
    return News;
}