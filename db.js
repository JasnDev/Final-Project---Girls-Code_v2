import mysql from 'mysql2/promise'; 
import fs from 'fs'

async function db (){
    if (global.connection && global.connection.state !== "disconnected")
        return global.connection;

    const conn = await mysql.createConnection(process.env.DATABASE_CONNECTION_STRING);

    console.log("Conectado ao MySQL!");
     global.connection = conn;
     return conn;
}

export { db };



