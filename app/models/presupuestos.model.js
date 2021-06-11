const sequelize = require('../../db/conexion');
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
  constructor(proyecto, version, estado, autor, mes, anio, valores) {
      this.proyecto = proyecto;
      this.version = version;
      this.estado = estado;
      this.autor = autor;
      this.mes = mes;
      this.anio = anio;
      this.valores = valores;
  }

  //Crear Presupuesto
  nuevoPresupuesto = async () => {
    try {
      let nuevoPresupuesto = await Presupuestos.create({
          proyecto: this.proyecto,
          version: this.version,
          estado: this.estado,
          autor: this.autor,
          mes: this.mes,
          anio: this.anio
      });

        //Guardar todos los datos que son parte del presupuesto
        this.valores.flujoEfectivo.forEach(async ingreso => {
            await FlujoEfectivo.create({
                ingreso: ingreso,
                presupuesto_id: nuevoPresupuesto.id
            });
        });

        this.valores.ingresos.forEach(async ingreso => {
            let nuevoIngreso = await Ingresos.create({
                concepto: ingreso.concepto,
                presupuesto_id: nuevoPresupuesto.id
            });
            ingreso.valores.forEach(async valorI => {
                await IngresosValues.create({
                    valor: valorI,
                    ingreso_id: nuevoIngreso.id
                });
            });
        });
        
        this.valores.directos.forEach(async costoD => {
            let nuevoDirecto = await CostosDirectos.create({
                concepto: costoD.concepto,
                presupuesto_id: nuevoPresupuesto.id
            });
            costoD.valores.forEach(async valorD => {
                await DirectosValues.create({
                    valor: valorD,
                    directo_id: nuevoDirecto.id
                });
            });
        });
        
        this.valores.administrativos.forEach(async gastoAdmon => {
            let nuevoGasto = await GastosAdmon.create({
                concepto: gastoAdmon.concepto,
                presupuesto_id: nuevoPresupuesto.id
            });
            gastoAdmon.valores.forEach(async valorA => {
                await AdmonValues.create({
                    valor: valorA,
                    admon_id: nuevoGasto.id
                });
            });
        });            

        this.valores.recursos.forEach(async recurso => {
            let nuevoRecurso = await Recursos.create({
                concepto: recurso.concepto,
                costo: recurso.costoMensual,
                presupuesto_id: nuevoPresupuesto.id
            });
            recurso.valores.forEach(async valorRP => {
                await RecursosValues.create({
                    valor: valorRP,
                    recurso_id: nuevoRecurso.id
                });
            });
        });
      return 'Presupuesto creado';
    } catch (error) {
        throw new Error('Error al crear presupuesto');
    }
  }

  //Mostrar todos lo Presupuestos
  static listarPresupuestos = async () => {
      try {
        let resultado = await sequelize.query("SELECT * FROM dbo.presupuestos WHERE estado = 'Activo'")
        return resultado[0]
      } catch (error) {
        throw new Error('Error al consultar la DB');
      }
  }

  //Modificar Presupuesto
  modificarPresupuesto = async (id) => {        
  }

  //Eliminar Presupuesto
  static eliminarPresupuesto = async (id) => {
    try {
        await Presupuestos.update({
            estado: 'Eliminado'}, 
            {where: { id : id}})
        return true;
    }catch (err){
        throw new Error ('No se pudo eliminar el presupuesto seleccionado')
    }
  }
} 