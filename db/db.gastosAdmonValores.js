const {DataTypes, Model} = require('sequelize')
const sequelize = require('./conexion')

//Definir mi Modelo con que voy a trabajar
const AdmonValues = sequelize.define('gastos_admon_valores', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    admon_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'gastos_administrativos',
            key: 'id'
        },
        allowNull: false        
    },
    valor: {
        type: DataTypes.DECIMAL(10,2),
        allowNull: true,        
    },    
}, {
    timestamps: false
});

module.exports = AdmonValues;