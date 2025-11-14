
import app from './reservas.js';

process.loadEnvFile();

//console.log(process.env.PUERTO);
app.listen(process.env.PUERTO, () => { 
 console.log(`servidor iniciado  en , ${process.env.PUERTO} `);
})

