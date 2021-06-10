const {DataTypes, Model} = require('sequelize')
const sequelize = require('./conexion')

//Definir mi Modelo con que voy a trabajar
const RecursosValues = sequelize.define('recursos_valores', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    recurso_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'recursos',
            key: 'id'
        },
        allowNull: false        
    },
    porcentaje: {
        type: DataTypes.INTEGER,
        allowNull: true,        
    },    
}, {
    timestamps: false
});

module.exports = RecursosValues;