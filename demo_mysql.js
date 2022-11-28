const express = require("express");
const app = express();
const mysql = require('mysql');
require('dotenv').config();

const pool = mysql.createPool({
    connectionLimit: 100,
    host: process.env.host,
    user: process.env.user,
    password: process.env.password,
    database: process.env.database
  });

// app.get("/",(req,res) => {
//     pool.getConnection((err, connection) => {
//         if(err) throw err;
//         console.log('connected as id ' + connection.threadId);
//         connection.query('SELECT * from users LIMIT 1', (err, rows) => {
//             connection.release(); // return the connection to pool
//             if(err) throw err;
//             console.log('The data from users table are: \n', rows);
//         });
//     });
// });

// app.listen(3000, () => {
//     console.log('Server is running at port 3000');
// });

// query rows in the table

function queryRow(userName) {
    let selectQuery = 'SELECT * FROM ?? WHERE ?? = ?';    
    let query = mysql.format(selectQuery,["users","username", userName]);
    // query = SELECT * FROM `users` where `username` = 'dphong'
    pool.query(query,(err, data) => {
        if(err) {
            console.error(err);
            return;
        }
        // rows fetch
        console.log(data);
    });
    
}

// add rows in the table

function addRow(data) {
    let insertQuery = 'INSERT INTO ?? (??,??) VALUES (?,?)';
    let query = mysql.format(insertQuery,["users","username","notes",data.user,data.value]);
    pool.query(query,(err, response) => {
        if(err) {
            console.error(err);
            return;
        }
        // rows added
        console.log("id " + response.insertId + " has been added.");
    });
}

// update rows

function updateRow(data) {
    let updateQuery = "UPDATE ?? SET ?? = ? WHERE ?? = ?";
    let query = mysql.format(updateQuery,["users","notes",data.value,"username",data.user]);
    // query = UPDATE `todo` SET `notes`='Hello' WHERE `name`='shahid'
    pool.query(query,(err, response) => {
        if(err) {
            console.error(err);
            return;
        }
        // rows updated
        console.log(response.affectedRows + " row has been updated.");
    });
}

function deleteRow(userId) {
    let deleteQuery = "DELETE from ?? where ?? = ?";
    let query = mysql.format(deleteQuery, ["users", "id", userId]);
    // query = DELETE from `todo` where `id`='2';
    pool.query(query,(err, response) => {
        if(err) {
            console.error(err);
            return;
        }
        // rows deleted
        console.log(response.affectedRows + " row has been deleted");
    });
}

// timeout just to avoid firing query before connection happens

setTimeout(() => {
    console.log(process.env.database);
    // call the function
    // select rows
    queryRow('dphong');
    // addRow({
    //     "user": "Shahid",
    //     "value": "Just adding a note"
    // });
    // update row
    updateRow({
        "user": "dphong",
        "value": "Just updating a note"
    });

    //deleteRow(2);
},2000);
