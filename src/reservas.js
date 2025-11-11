import express from 'express';

import passport from 'passport';

import morgan from 'morgan';

import fs from 'fs';

import { estrategia, validacion} from './config/passport.js';

import { router as v1salonesRutas } from './v1/rutas/v1salonesRutas.js';
import { router as v1ReservasRutas } from './v1/rutas/v1sreservasRutas.js';
import { router as v1AuthRouter } from './v1/rutas/authRoutes.js';

const app = express();

app.use(express.json());

passport.use(express.json());

passport.use(estrategia);
passport.use(passport.initialize());

let log = fs.createWriteStream('./access.log', {flags:'a'})
app.use(morgan('combined'))
app.use(morgan('combined', {stream:log}))


app.use('/api/v1/auth', v1AuthRouter);
app.use('/api/v1/salones', v1salonesRutas);

app.use('/api/v1/reservas', passport.authenticate('jwt', {session:false}),v1ReservasRutas);





export default app;
 /**

app.get('/estado', ( req, res) =>{
    res.json({'ok':true});
    //res.status(200).send({ 'estado':true,  'mensaje':'reserva creada'});
});


app.get('/salones', async (req, res) => {
    try {
        
        
        const sql = `SELECT * FROM salones WHERE activo = 1`;

        const [results, fields] = await conexion.query(sql);

        // console.log(results); // results contains rows returned by server
        // console.log(fields); // fields contains extra meta data about results, if available

        res.json({'ok': true, 'salones': results});
    } catch (err) {
        console.log(err);
    }
})




app.get('/salones/:salon_id', async (req, res) => {
    try {
        const salon_id = req.params.salon_id;
        const sql = `SELECT * FROM salones WHERE activo =1 and salon_id = ?`;
        const valores =  [salon_id];

        const [results, fields] = await conexion.query(sql, valores);

        if (results.length === 0){
            return res.status(404).json({
                estado: false, 
                mensaje: 'salon no encontrado'

            })
        }

        // console.log(results); // results contains rows returned by server
        // console.log(fields); // fields contains extra meta data about results, if available

        res.json({
            estado: true, 
            salon: results[0]
        });

    } catch (err) {
        console.log( 'Eroor en GET/salones/:salon_id', err);
        res.status(500).json({
            estado :false,
            mensaje:'error del servidor',

        })
    }
})

app.post('/salones', async(req , res)=>{ 
    try{
        if(!req.body.titulo || !req.body.direccion || !req.body.capacidad || !req.body.importe) {
           return res.status(400).json({ 
            estado:false, 
            mensaje: 'faltan datos'
        });

    }
    const {titulo ,direccion, capacidad,importe} = req.body;
    const valores = [ titulo , direccion,capacidad, importe];
    const sql ='INSERT INTO salones( titulo , direccion, capacidad, importe) VALUES(?,?,?,?)';

    const [results] = await conexion.execute(sql, valores);
    console.log(results);

    res.status(201).json({
        estado:true,
        mensaje:'salon creado'
    })
    
} catch (err) {
    console.log( 'Eroor en POST/salones/', err);
    res.status(500).json({
        estado :false,
        mensaje:'error del servidor',

    });
    }
});

     
  
app.put('/salones/:salon_id', async (req, res) => {
    //
    const {salon_id} = req.params;

    if(!req.body.titulo || !req.body.direccion || !req.body.capacidad || !req.body.importe) {
        return res.status(400).json({ 
         estado:false, 
         mensaje: 'faltan datos'
        });
     }
    try {
        //
        const {titulo , direccion,capacidad,importe} = req.body;
        const sql = 'SELECT * FROM salones WHERE activo = 1 and salon_id = ?';
        const [results] = await conexion.execute(sql, [salon_id]);

        if (results.length === 0) {
            return res.status(404).json({
                estado: false,
                mensaje: 'El salon no existe o no se encuentra activo.'
            });
        }

    const valores = [ titulo , direccion,capacidad, importe, salon_id];
    const sql2 ='UPDATE salones SET titulo = ?,direccion = ?, capacidad = ? , importe = ? WHERE salon_id = ?';

    const [resultsUpdate] = await conexion.execute(sql2, valores);
    console.log(resultsUpdate);

    res.status(200).json({
    estado:true,
    mensaje:'salon modificado'

});





} catch (err) {
        console.log('Error en PUT /salones/:salon_id', err);
        res.status(500).json({
            estado: false,
            mensaje: 'el salon no existe.'
        });
    }
});



app.delete('/salones/:salon_id', async (req, res) => {

    try {
        const {salon_id} = req.params;
        
        
        const sql = 'SELECT * FROM salones WHERE activo = 1 and salon_id = ?';
       
        const [results] = await conexion.execute(sql, [salon_id]);

        if (results.length === 0) {
            return res.status(404).json({
                estado: false,
                mensaje: 'El salon no existe'
            });
        }

    
    const sql2 ='UPDATE salones SET activo = 0 WHERE salon_id = ?';

    const [resultsUpdate] = await conexion.execute(sql2, [salon_id]);
    console.log(resultsUpdate);

    res.status(200).json({
    estado:true,
    mensaje:'salon eliminado',

});



} catch (err) {
        console.log('Error en al delete /salones/:salon_id', err);
        res.status(500).json({
            estado: false,
            mensaje: 'el salon no existe.'
        });
    }
});


//const {titulo ,direccion, capacidad,importe} = req.body;





//app.post('/notificacion', (req , res)=>{
 //   console.log(req.body);
 //   if(!req.body.fecha || !req.body.salon || !res.body.turno || !req.body.correoDestino) {
 //       res.status(400).send({ 'estado':false,  'mensaje':'faltan datos'});
  //  }

//});
  */

//process.loadEnvFile();
//console.log(process.env.PUERTO);
//app.listen(process.env.PUERTO, () => { 
//   console.log('servidor arriba');
//})