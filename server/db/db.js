import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

const db = await mysql.createConnection({
  host: process.env.host || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "Jayasai@2005",
  database: process.env.DB_NAME || "emailScheduler",  
});

console.log("MySQL Connected");

export default db;
