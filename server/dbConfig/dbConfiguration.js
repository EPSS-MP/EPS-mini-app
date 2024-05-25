import mysql from 'mysql2'
import dotenv from 'dotenv'
dotenv.config()

let connectionInfo = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.USER_NAME,
  password: process.env.USER_PASSWORD,
  database: process.env.DB_NAME
});


export  {connectionInfo}