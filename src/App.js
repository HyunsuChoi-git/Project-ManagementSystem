import React, {Component} from 'react';
import './App.css';
import Customer from './components/Customer';

const customers = [
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
]


function App() {
  return (
    <div>
      {
        customers.map(c => {
          return(
            <Customer
              key={c.id}
              id={c.id}
              name={c.name}
              image={c.image}
              gender={c.gender}
              birthday={c.birthday}
              job={c.job}
            />
          )
        })
      }
    </div>
        // 출력하고자 하는 데이터를 컴포넌트에 보내준다.

        // map 함수를 이용하여 배열 형태의 반복되는 데이터를 추출할 수 있다.
        // map 함수를 이용할 때에는 'key' 설정으로 각 데이터 고유의 값을 지정해주어야 한다,
  );
}

export default App;
