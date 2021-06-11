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
    console.log(data);
    const { proyecto, version, estado, autor, mes, anio, valores } = data;
    let nuevoBudget = new PresupuestoModel(proyecto, version, estado, autor, mes, anio, valores);      
    try {
        let res = await nuevoBudget.nuevoPresupuesto();
        return res;
    } catch (error) {
        throw error;
    }    
}