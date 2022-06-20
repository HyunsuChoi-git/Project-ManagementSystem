import React, {Component} from 'react';
import './App.css';
import Customer from './components/Customer';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: "auto"
  },
  table: {
    minWidth: 1080
  }
})

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


class App extends Component{
    render() {
      const { classes } = this.props;
      return (
        <Paper className={classes.root}>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell>번호</TableCell>
                <TableCell>이미지</TableCell>
                <TableCell>이름</TableCell>
                <TableCell>생년월일</TableCell>
                <TableCell>성별</TableCell>
                <TableCell>직업</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              { customers.map(c => 
                  { return( <Customer key={c.id} id={c.id} name={c.name} image={c.image} gender={c.gender} birthday={c.birthday} job={c.job} /> ) }
                ) }
            </TableBody>
          </Table>
        </Paper>
            // 출력하고자 하는 데이터를 컴포넌트에 보내준다.

            // map 함수를 이용하여 배열 형태의 반복되는 데이터를 추출할 수 있다.
            // map 함수를 이용할 때에는 'key' 설정으로 각 데이터 고유의 값을 지정해주어야 한다.

            // Material iu 를 통해 Table 형태로 출력해줄 수 있다.
            // Table 태그로 감싸고, 데이터가 출력되는 부분은 통상 TableBody 태그 내부에 담아주는 것이 룰이다.
            // div --> Paper 태그로 변경. Paper는 컴포넌트의 외부를 감싸기위해 사용하는 컴포넌트 중 하나.
      );
    }
}

//export default withStyles(styles)(App);
export default withStyles(styles)(App);
