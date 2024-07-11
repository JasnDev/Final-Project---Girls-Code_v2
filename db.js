import mysql from 'mysql2/promise'; 
import fs from 'fs'

async function db (){
    if (global.connection && global.connection.state !== "disconnected")
        return global.connection;

    const conn = await mysql.createConnection({host:"formulario-girlscode.mysql.database.azure.com", 
        user:"j4sanias", 
        password:"Admin123", 
        database:"formulario", 
        port:3306,  
    });

    console.log("Conectado ao MySQL!");
     global.connection = conn;
     return conn;
}

export { db };



