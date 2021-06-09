const sequelize = require('../../db/conexion');
const controladorUsuarios = require('../controllers/usuarios.controller');

module.exports = async (app)=> {
    
    //Ruta para Login
    app.get('/login', async (req,res)=>{
        try{
            res.render('login');
        }catch (err){
            res.status(400).json('No se puede mostrar')
        }
    })

    app.post('/login', async (req,res)=>{
        let usuario = req.body
        try {
            let resultado = await controladorUsuarios.chequearUsuario(usuario)
            if (resultado != false){
                let tokenResult = await controladorUsuarios.generaToken(usuario)
                res.json({ token: tokenResult, user: resultado })
            }else {
                throw new Error ("Contraseña Incorrecta")
            }
        }catch (err){
            res.status(400).json({ error: err.message}) 
        }
    })

    app.get('/signup', async (req, res) => {
        try{
            res.render('signup');
        }catch (err){
            res.status(400).json('No se puede mostrar')
        }
    })

    app.post('/signup', async (req,res)=>{
        let usuario = req.body
        try {
            let resultado = await controladorUsuarios.registroNuevoUsuario(usuario)
            if (resultado != false){
                let tokenResult = await controladorUsuarios.generaToken(usuario)
                res.json({ token: tokenResult, user: resultado })
            }else {
                throw new Error ("Contraseña Incorrecta")
            }
        }catch (err){
            res.status(400).json({ error: err.message}) 
        }
    })

    app.get('/usuario/:id', async (req, res) => {
        let data = req.params.id;
        try{
            let resultado = await controladorUsuarios.buscarUsuario(data)
            res.render('usuario', {result:resultado});
        }catch (err){
            res.status(400).json('No se puede mostrar usuario')
        }
    })

    app.post('/usuario/:id', async (req, res) => {
        let id = req.params.id;
        let user = req.body;
        try {
            let resultado = await controladorUsuarios.updateUsuario(id, user);
            if (resultado != false){
                let tokenResult = await controladorUsuarios.generaToken(user)
                res.json({ token: tokenResult, user: resultado })
            }else {
                throw new Error ("Error al Modificar")
            }
        }catch (err){
            res.status(400).json({ error: err.message}) 
        }
    })

    app.get('/delete/:id', async (req,res)=>{
        let data = req.params.id;
        try {
            let resultado = await controladorUsuarios.eliminarUsuario(data)
            if(resultado){
                res.redirect('/usuarios');
            }      
        }catch (err){
            res.status(400).json('No se puedo eliminar el usuario')
        }
    })
}