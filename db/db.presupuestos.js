const {DataTypes, Model} = require('sequelize');
const sequelize = require('./conexion');
const CostosDirectos = require('./db.costosDirectos');
const FlujoEfectivo = require('./db.flujoefectivo');
const GastosAdmon = require('./db.gastosAdmon');
const Recursos = require('./db.recursos');
const Ingresos = require('./db.ingresos');

//Definir mi Modelo con que voy a trabajar
const Presupuestos = sequelize.define('presupuestos', {
    id : {
      type: DataTypes.STRING(20),
      primaryKey: true,
      autoIncrement: false,
    },
    fecha : {
        type: DataTypes.DATE,
        allowNull: false,
    },
    proyecto: {
        type: DataTypes.STRING(60),
        allowNull: false,
    },
    version: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    estado: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    autor: {
        type: DataTypes.STRING(200),
        allowNull: false
      },
    mes: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    anio: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
  },{
    timestamps: true
})

Presupuestos.hasMany(CostosDirectos, {
  foreignKey: {
      name: 'presupuesto_id',
      type: DataTypes.STRING(20),
      allowNull: false
  },
  onDelete: 'CASCADE'
});

Presupuestos.hasMany(FlujoEfectivo, {
  foreignKey: {
      name: 'presupuesto_id',
      type: DataTypes.STRING(20),
      allowNull: false
  },
  onDelete: 'CASCADE'
});

Presupuestos.hasMany(GastosAdmon, {
  foreignKey: {
      name: 'presupuesto_id',
      type: DataTypes.STRING(20),
      allowNull: false
  },
  onDelete: 'CASCADE'
});

Presupuestos.hasMany(Recursos, {
  foreignKey: {
      name: 'presupuesto_id',
      type: DataTypes.STRING(20),
      allowNull: false
  },
  onDelete: 'CASCADE'
});

Presupuestos.hasMany(Ingresos, {
  foreignKey: {
      name: 'presupuesto_id',
      type: DataTypes.STRING(20),
      allowNull: false
  },
  onDelete: 'CASCADE'
});

module.exports = Presupuestos;