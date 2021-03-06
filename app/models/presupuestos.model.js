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
      return true;
    } catch (error) {
        throw new Error('No se pudo crear el Presupuesto');
    }
  }

  //Mostrar todos lo Presupuestos
  static listarPresupuestos = async () => {
      try {
        let resultado = await sequelize.query("SELECT id, proyecto, version, CONVERT(varchar(10), createdAt) AS fecha FROM dbo.presupuestos  WHERE estado = 'Activo'")
        // let resultado = await Presupuestos.findAll({
        //     where: { estado: 'Activo'},
        //     //attributes: ['id', 'proyecto', 'version', 'createdAt'],
        //     attributes: [[sequelize.fn('sum', sequelize.col('createdAt')), 'total']]
        // })
        return resultado[0]
      } catch (error) {
        throw new Error('Error al consultar la DB');
      }
  }

  static detallesPresupuesto = async (id) => {
    try{
        let presupuesto = await Presupuestos.findOne({
            where: {
                id: id,
            },
            attributes: ['id', 'proyecto', 'version', 'estado', 'autor', 'anio', 'mes', 'createdAt'],
            include: [                                                        
                {
                    model: FlujoEfectivo,
                    attributes: ['id', 'ingreso'],                        
                },
                {
                    model: Ingresos,
                    attributes: ['id', 'concepto'],
                    include: {
                        model: IngresosValues,
                        attributes: ['id', 'valor']
                    }
                },
                {
                    model: CostosDirectos,
                    attributes: ['id', 'concepto'],
                    include: {
                        model: DirectosValues,
                        attributes: ['id', 'valor']
                    }
                },
                {
                    model: GastosAdmon,
                    attributes: ['id', 'concepto'],
                    include: {
                        model: AdmonValues,
                        attributes: ['id', 'valor']
                    }
                },
                {
                    model: Recursos,
                    attributes: ['id', 'concepto', 'costo'],
                    include: {
                        model: RecursosValues,
                        attributes: ['id', 'valor']
                    }
                }
            ] 
            
        });           
        if(presupuesto == null){
            return false;
        } else {
            return presupuesto;
        }
    } catch (error) {
        throw new Error('Error al consultar la DB');
      }
  }

  //Modificar Presupuesto
  modificarPresupuesto = async (id) => {
    try {
        let actualizaPresupuesto = await Presupuestos.findOne({
            where: {id: id}
        })

        if(actualizaPresupuesto != null){
            await Presupuestos.update({
                proyecto: this.proyecto,
                version: this.version,
                estado: this.estado,
                autor: this.autor,
                mes: this.mes,
                anio: this.anio},
                {where: { id : id}})

                //Se eliminan los datos anteriores para dar espacio a los nuevos
                    FlujoEfectivo.destroy({
                        where: { presupuesto_id: id }
                    });
                    Ingresos.destroy({
                        where: { presupuesto_id: id }
                    });
                    CostosDirectos.destroy({
                        where: { presupuesto_id: id }
                    });
                    GastosAdmon.destroy({
                        where: { presupuesto_id: id }
                    });
                    Recursos.destroy({
                        where: { presupuesto_id: id }
                    });                        
            
                //Guardar todos los datos que son parte del presupuesto
                    this.valores.flujoEfectivo.forEach(async ingreso => {
                        await FlujoEfectivo.create({
                            ingreso: ingreso,
                            presupuesto_id: id
                        });
                    });
            
                    this.valores.ingresos.forEach(async ingreso => {
                        let nuevoIngreso = await Ingresos.create({
                            concepto: ingreso.concepto,
                            presupuesto_id: id
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
                            presupuesto_id: id
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
                            presupuesto_id: id
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
                            presupuesto_id: id
                        });
                        recurso.valores.forEach(async valorRP => {
                            await RecursosValues.create({
                                valor: valorRP,
                                recurso_id: nuevoRecurso.id
                            });
                        });
                    });
            return true;
        } else {
            throw new Error('No existe el Presupuesto');
        }
      } catch (error) {
          throw new Error('No se pudo Modificar el Presupuesto');
      }
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