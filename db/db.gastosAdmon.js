const {DataTypes, Model} = require('sequelize');
const sequelize = require('./conexion');
const AdmonValues = require('./db.gastosAdmonValores');

//Definir mi Modelo con que voy a trabajar
const GastosAdmon = sequelize.define('gastos_administrativos', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    presupuesto_id: {
        type: DataTypes.STRING(20),
        references: {
            model: 'presupuestos',
            key: 'id'
        },
        allowNull: false        
    },
    concepto: {
        type: DataTypes.STRING(30),
        allowNull: true,        
    },        
}, {
    timestamps: false
});

GastosAdmon.hasMany(AdmonValues, {
    foreignKey: {
        name: 'admon_id',
        type: DataTypes.INTEGER,
        allowNull: false
    },
    onDelete: 'CASCADE'
});

module.exports = GastosAdmon;