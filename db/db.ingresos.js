const {DataTypes, Model} = require('sequelize');
const sequelize = require('./conexion');
const IngresosValues = require('./db.ingresosValores');

//Definir mi Modelo con que voy a trabajar
const Ingresos = sequelize.define('ingresos', {
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

Ingresos.hasMany(IngresosValues, {
    foreignKey: {
        name: 'ingreso_id',
        type: DataTypes.INTEGER,
        allowNull: false
    },
    onDelete: 'CASCADE'
});

module.exports = Ingresos;