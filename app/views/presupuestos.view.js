const sequelize = require('../../db/conexion');
const controladorUsuarios = require('../controllers/usuarios.controller');

module.exports = async (app)=> {

    app.get('/', async (req, res) => {
        let ingresos = req.body.ingresos.conceptos;
        let ingresosValues = req.body.ingresos.valores;
        let val = ingresosValues.length / ingresos.length
        console.log(ingresosValues.slice(0,val));
        console.log(ingresosValues.slice(val,(val*2)));
        console.log(ingresosValues.slice(val*2,(val*3)));
        res.status(200).json('OK')
    })

    app.get('/index', async (req,res)=>{
        try{
            res.render('index');
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
}
