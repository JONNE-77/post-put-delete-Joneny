const mysql = require("mysql");
const dbConfig = require("../config/db.config.js");

// ສ້າງ MySQL connection ໂດຍຖືເອົາ configuration
const connection = mysql.createConnection({
    host: dbConfig.HOST,
    user: dbConfig.USER,
    password: dbConfig.PASSWORD,
    database: dbConfig.DB
});

// ເຊື່ອມຕໍ່ database
connection.connect(error => {
    if (error) throw error;  
    console.log("Successfully connected to the database.");
});

// ສົ່ງອອກ connection ໃຫ້ Models 
module.exports = connection; 