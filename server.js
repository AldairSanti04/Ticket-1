const express = require('express');
const app = express();
require('dotenv').config();
const cors = require('cors');
const sequelize = require('./db/conexion');
const vistaPresupuestos = require('./app/views/presupuestos.view');
const vistaUsuarios = require('./app/views/usuarios.view');
const Usuarios = require('./db/db.usuarios');
const Presupuestos = require('./db/db.presupuestos');
const FlujoEfectivo = require('./db/db.flujoefectivo');
const Ingresos = require('./db/db.ingresos');
const IngresosValues = require('./db/db.ingresosValores');
const CostosDirectos = require('./db/db.costosDirectos');
const DirectosValues = require('./db/db.costosDirectosValores');
const GastosAdmon = require('./db/db.gastosAdmon');
const AdmonValues = require('./db/db.gastosAdmonValores');
const Recursos = require('./db/db.recursos');
const RecursosValues = require('./db/db.recursosValores');


app.use(express.json());
app.use(cors());
//app.use(midd.limiter);

app.use(express.static(__dirname + '/public'))
app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')

//middleware para captura de errores globales.
app.use((err, req, res, next)=> {
    console.log(err);
    if (!err){
        return next();
    }
    return res.status(500).json('Se produjo un error inesperado, intente nuevamente')
});

//Iniciar el Servidor
async function inicioServidor() {
    try {
        await Usuarios.sync({alter:true});
        await Presupuestos.sync({alter:true});
        await Ingresos.sync({alter:true});
        await FlujoEfectivo.sync({alter:true});
        await CostosDirectos.sync({alter:true});
        await GastosAdmon.sync({alter:true});
        await Recursos.sync({alter:true});
        await IngresosValues.sync({alter:true});
        await DirectosValues.sync({alter:true});
        await AdmonValues.sync({alter:true});
        await RecursosValues.sync({alter:true});
        // await Usuarios.findOrCreate({
        //     where: {
        //         nombres: 'Aldair', 
        //         apellidos: 'Santiago', 
        //         email: 'aldair@admin.com', 
        //         usuario: 'aldairsanti04', 
        //         pass: 'holitas123', 
        //     }
        // })
        await sequelize.authenticate();
        console.log('Conexion con la DB correcta!');
        app.listen(process.env.PORT, function (){
            console.log(`Sistema iniciado en el puerto ${process.env.PORT}`);
        })
    }catch (err){
        console.log('No se pudo conectar con la DB');
    }
}

inicioServidor();

vistaPresupuestos(app);
vistaUsuarios(app);