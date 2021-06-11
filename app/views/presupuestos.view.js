const sequelize = require('../../db/conexion');
const controladorPresupuesto = require('../controllers/presupuestos.controller');
const middAuth = require('../../middleware/middVerificacion');

module.exports = async (app)=> {

    app.get('/', async (req, res) => {
        res.send('Inicio de la API :)');
    })

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
    
    //Falta Agregar Middlewares de Verificacion de Datos y Autenticacion de Usuario
    app.post('/nuevoBudget', async (req, res) => {
        let datos = req.body;
        try {
            let resultado = await controladorPresupuesto.nuevoBudget(datos);
            res.status(200).json(resultado);
        } catch (error) {
            res.status(400).json({error: error.message});
        }
    })

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