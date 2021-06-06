const sequelize = require('../../db/conexion');
const controladorUsuarios = require('../controllers/usuarios.controller');

module.exports = async (app)=> {
    
    //Ruta para Login
    app.get('/login', async (req,res)=>{
        try{
            res.render('login');
        }catch (err){
            res.estatus(400).json('No se puede mostrar')
        }
    })

    app.post('/login', async (req,res)=>{
        let usuario = req.body
        try {
            let resultado = await controladorUsuarios.chequearUsuario(usuario)
            if (resultado){
                let usuarioInfo = await controladorUsuarios.datosUsuario(usuario)
                let tokenResult = await controladorUsuarios.generaToken(usuario)
                res.json({ token: tokenResult, user: usuarioInfo })
            }else {
                throw new Error ("Contraseña Incorrecta")
            }
        }catch (err){
            res.status(400).json({ error: err.message})
        }
    })

    app.get('/index', async (req,res)=>{
        try{
            res.render('index');
        }catch (err){
            res.estatus(400).json('No se puede mostrar')
        }
    })

    app.get('/index/nuevo', async (req,res)=>{
        try{
            res.render('newbudget');
        }catch (err){
            res.estatus(400).json('No se puede mostrar')
        }
    })
}
