const express = require('express');
const app = express();
//const port = 3000;//debug
const port = 80;//publish

// const mysql = require('./mysql.js');
// const connection = mysql.connection;

app.use(express.json());
app.use(express.urlencoded({extended : true}));

const auth = require('./auth');
app.use('/auth', auth);

let server = app.listen(port, () => {
    console.log("Express server has started on port : "+port);
});

app.get('/', (req, res) => {
    res.send('Hello nodemon');
});




