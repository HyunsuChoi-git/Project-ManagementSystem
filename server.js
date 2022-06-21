const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));
// 위 코드는 node.js express를 사용할 때 일반적으로 작성하는 코드

app.get('/api/customers', (req, res) => {
    res.send([
        {
        'id' : 1,
        'image' : 'http://placeimg.com/64/64/1',
        'name' : '홍길동',
        'birthday' : 961222,
        'gender' : '남자',
        'job' : '대학생'
        },
        {
        'id' : 2,
        'image' : 'http://placeimg.com/64/64/2',
        'name' : '이순신',
        'birthday' : 931222,
        'gender' : '남자',
        'job' : '포토그래퍼'
        },
        {
        'id' : 3,
        'image' : 'http://placeimg.com/64/64/3',
        'name' : '대장금',
        'birthday' : 941222,
        'gender' : '여자',
        'job' : '디자이너'
        }
  
    ])
});

app.listen(port, () => console.log(`Listening on port ${port} !`));

