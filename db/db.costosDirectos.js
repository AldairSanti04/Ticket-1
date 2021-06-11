const {DataTypes, Model} = require('sequelize');
const sequelize = require('./conexion');
const DirectosValues = require('./db.costosDirectosValores');

//Definir mi Modelo con que voy a trabajar
const CostosDirectos = sequelize.define('costos_directos', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    presupuesto_id: {
        type: DataTypes.INTEGER,
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

CostosDirectos.hasMany(DirectosValues, {
    foreignKey: {
        name: 'directo_id',
        type: DataTypes.INTEGER,
        allowNull: false
    },
    onDelete: 'CASCADE'
});

module.exports = CostosDirectos;