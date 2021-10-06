const mysql = require('mysql');

const connection = mysql.createConnection({
    host    : 'database-1.cflrhb2h8wie.ap-northeast-2.rds.amazonaws.com',
    user    : 'mkeduit',
    password: '1234',
    database: 'keduit'
});

connection.connect();

exports.connection = connection;

// connection.query('SELECT * from musers', (err, rows, fields)=>{
//     if (err) throw err;
//     console.log('The solution is : ', rows);
// });

// connection.end();