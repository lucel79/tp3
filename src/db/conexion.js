

import mysql from 'mysql2/promise';
process.loadEnvFile();
//import { createConnection } from 'mysql2/promise'; 

//export const conexion = await createConnection
export const conexion = await mysql.createConnection({
host: process.env.DB_HOST,
user: process.env.DB_USER,
database: process.env.DB_DATABASE,
password:process.env.DB_PASSWORD,
port: process.env.DB_PORT,
multipleStatements: process.env.DB_MULTIPLE_STATEMENTS

});