const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));
// 위 코드는 node.js express를 사용할 때 일반적으로 작성하는 코드

//---- DT CONNECTION -----//
const fs = require('fs');

const dtInfo = fs.readFileSync('./database.json');
const conf = JSON.parse(dtInfo);
const mysql = require('mysql');

const connection = mysql.createConnection({
    host : conf.host,
    user : conf.user,
    password : conf.password,
    port : conf.port,
    database : conf.database
});

connection.connect();
//////////////////////////////


app.get('/api/customers', (req, res) => {
    connection.query(
        "SELECT * FROM CUSTOMER",
        (err, rows, fields) => {
            res.send(rows);
        }
    )
});



app.listen(port, () => console.log(`Listening on port ${port} !`));

