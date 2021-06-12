const sequelize = require('../../db/conexion');
const controladorPresupuesto = require('../controllers/presupuestos.controller');
const middValidacion = require('../../middleware/middVerificacionDatos');
const middAuth = require('../../middleware/middVerificacion');

module.exports = async (app)=> {

    app.get('/', async (req, res) => {
        res.send('Inicio de la API :)');
    })

    // Endopints para Renderizar EJS
    app.get('/index', async (req,res)=>{
        try{
            let resultado = await controladorPresupuesto.obtenerPresupuestos()
            res.render('index',  {results:resultado});
        }catch (err){
            res.status(400).json('No se puede mostrar')
        }
    })

    app.get('/index/nuevo', async (req,res)=>{
        try{
            res.render('newbudget');
        }catch (err){
            res.status(400).json('No se puede mostrar')
        }
    })

    //Ver los detalles de un solo Presupuesto seleccionado por Id
    app.get('/verPresupuesto/:id', async (req,res)=>{
        let id = req.params.id;
        try{
            let resultado = await controladorPresupuesto.obtenerUnPresupuesto(id);
            //Falta Mostrar los datos en un EJS con Render
            res.status(200).json(resultado);
        }catch (err){
            res.status(400).json({err: err.message})
        }
    })

    //Modificar un presupuesto
    app.post('/actualizarPresupuesto/:id', middAuth.verificacionUsuario, middValidacion.validarPresupuesto, async (req, res) => {
        let id = req.params.id;
        let datos = req.body;
        try {
            let resultado = await controladorPresupuesto.actualizarBudget(id, datos);
            if(resultado){
                res.status(200).json('ok');
            }
        } catch (error) {
            res.status(400).json({error: error.message});
        }
    })
    
    //Guardar Nuevo Presupuesto
    app.post('/nuevoBudget', middAuth.verificacionUsuario, middValidacion.validarPresupuesto, async (req, res) => {
        let datos = req.body;
        try {
            let resultado = await controladorPresupuesto.nuevoBudget(datos);
            if(resultado){
                res.status(200).json('ok');
            }
        } catch (error) {
            res.status(400).json({error: error.message});
        }
    })

    //Eliminado Logico del Presupuesto
    app.get('/eliminar/:id', middAuth.verificacionUsuario, async (req, res) => {
        let data = req.params.id;
            try {
                let resultado = await controladorPresupuesto.deleteBudget(data)
                if(resultado){
                    res.status(200).json('ok');
                }      
            }catch (err){
                res.status(400).json({error: error.message})
            }
    })
}