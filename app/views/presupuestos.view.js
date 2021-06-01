const sequelize = require('../../db/conexion')

module.exports = async (app)=> {
    
    //Ruta para Login
    app.get('/login', async (req,res)=>{
        try{
            res.render('login');
        }catch (err){
            res.estatus(400).json('No se puede mostrar')
        }
    })

}
