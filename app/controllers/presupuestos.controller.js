const PresupuestoModel = require('../models/presupuestos.model');

module.exports.obtenerPresupuestos = async () => {
    try {
    let resultado = await PresupuestoModel.listarPresupuestos()
    return resultado
    }catch (err) {
        console.log('Error desde el modelo' + err)
        throw new Error ({error: err.message})
    }
}

module.exports.nuevoBudget = async (data) => {
    const { proyecto, version, estado, autor, mes, anio, valores } = data;
    let nuevoBudget = new PresupuestoModel(proyecto, version, estado, autor, mes, anio, valores);      
    try {
        let resultado = await nuevoBudget.nuevoPresupuesto();
        return resultado;
    } catch (error) {
        throw error;
    }    
}

module.exports.deleteBudget = async (data) => {
    try {
        let resultado = await PresupuestoModel.eliminarPresupuesto(data);
        return resultado;
    } catch (error) {
        throw new Error ('No se pudo eliminar el presupuesto seleccionado')
    }    
}