const User = require('../db/users');

module.exports = class PresupuestoModel {
    constructor(id, fecha, proyecto, version) {        
        this.id = id;
        this.fecha = fecha;
        this.proyecto = proyecto;
        this.version = version;
    }

    //Crear Presupuesto
    nuevoPresupuesto = async () => {
    }
    
    //Mostrar todos lo Presupuestos
    listarPresupuestos = async () => {
    }
    
    //Modificar Presupuesto
    modificarPresupuesto = async (id) => {        
    }

    //Eliminar Presupuesto
    static eliminarPresupuesto = async (id) => {
    }
}