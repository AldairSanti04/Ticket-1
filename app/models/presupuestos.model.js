const Presupuestos = require('../../db/db.presupuestos');
const FlujoEfectivo = require('../../db/db.flujoefectivo');
const Ingresos = require('../../db/db.ingresos');
const IngresosValues = require('../../db/db.ingresosValores');
const CostosDirectos = require('../../db/db.costosDirectos');
const DirectosValues = require('../../db/db.costosDirectosValores');
const GastosAdmon = require('../../db/db.gastosAdmon');
const AdmonValues = require('../../db/db.gastosAdmonValores');
const Recursos = require('../../db/db.recursos');
const RecursosValues = require('../../db/db.recursosValores');

module.exports = class PresupuestoModel {
  constructor(id, fecha, proyecto, version, estado, autor, mes, anio) {        
      this.id = id;
      this.fecha = fecha;
      this.proyecto = proyecto;
      this.version = version;
      this.estado = estado;
      this.autor = autor;
      this.mes = mes;
      this.anio = anio;
  }

  //Crear Presupuesto
  nuevoPresupuesto = async () => {
  }

  //Mostrar todos lo Presupuestos
  static listarPresupuestos = async () => {
  }

  //Modificar Presupuesto
  modificarPresupuesto = async (id) => {        
  }

  //Eliminar Presupuesto
  static eliminarPresupuesto = async (id) => {
  }
} 