const {DataTypes, Model} = require('sequelize')
const sequelize = require('./conexion')

//Definir mi Modelo con que voy a trabajar
const FlujoEfectivo = sequelize.define('flujos_de_efectivo', {
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
    ingreso: {
        type: DataTypes.DECIMAL(20,2),
        allowNull: true,        
    },    
}, {
    timestamps: false
});

module.exports = FlujoEfectivo;