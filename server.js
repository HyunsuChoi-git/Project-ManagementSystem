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

const multer = require('multer');   // 파일을 받아 저장해주는 라이브러리. 파일을 받으면서 자동으로 파일명을 고유한 이름으로 변경해줌
const upload = multer({dest: './upload'})   // 받은 파일을 지정한 폴더에 저장

app.get('/api/customers', (req, res) => {
    connection.query(
        "SELECT * FROM CUSTOMER",
        (err, rows, fields) => {
            res.send(rows);
        }
    )
});


app.use('/image', express.static('./upload')) // 파일 폴더를 사용자와 공유하기 위함. '/image'로 접근하면 파일을 볼 수 있다.
app.post('/api/customers', upload.single('image'), (req, res) => {
    let sql = 'INSERT INTO CUSTOMER VALUES (null, ?, ?, ?, ?, ?)';
    let image = '/image/' + req.file.filename   // 파일명을 DB에 넣기위해 문자열 화 하기
    let name = req.body.name;
    let birthday = req.body.birthday;
    let gender = req.body.gender;
    let job = req.body.job;
    let params = [image, name, birthday, gender, job]; // 쿼리에 들어갈 데이터 순서대로 지정

    connection.query(sql, params, (err, rows, fields) => {
        res.send(rows);
    })

})

app.listen(port, () => console.log(`Listening on port ${port} !`));

