import React, {Component} from 'react';
import './App.css';
import Customer from './components/Customer';
import CustomerAdd from './components/CustomerAdd';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing(3),
    overflowX: "auto"
  },
  table: {
    minWidth: 1080
  },
  progress : {
    margin : theme.spacing(2)
  }
})


class App extends Component{
    constructor(props){
      super(props);
      this.state = {
        customers : '',
        completed : 0
      }
    }

    stateRefresh = () => {
      this.setState({
        customers : '',
        completed : 0
      });
      this.callApi() // api불러오기
        .then(res => this.setState({customers: res}))  
        // callApi에서 return받은 데이터를 res에 담은 후 --> setState. state로 만들어 --> customers 변수에 담기
        .catch(err => console.log(err)); 
        // 오류가 발생햇을 경우 콘솔창 표시
    }


    componentDidMount() {
      // API서버에 접근해서 데이터를 받아오는 등의 작업을 하는 라이브러리
      // 모든 컴포넌트의 Mount가 완료되었을 때 실행됨.

      this.timer = setInterval(this.progress, 20);    // 0.02 초마다 반복되면서 progress 함수가 실행되도록 하기
      this.callApi() // api불러오기
        .then(res => this.setState({customers: res}))  
        // callApi에서 return받은 데이터를 res에 담은 후 --> setState. state로 만들어 --> customers 변수에 담기
        .catch(err => console.log(err)); 
        // 오류가 발생햇을 경우 콘솔창 표시
    }

    callApi = async () => {
      //비동기적으로 내용을 수행할 수 있도록 만들기.
      const response = await fetch("/api/customers"); //접속하고자 하는 api 주소 넣기
      const body = await response.json(); //위에서 받아온 데이터를 json 형태로 가져오기
      return body;
    }

    progress = () => {
      const { completed } = this.state;
      this.setState( { completed: completed >= 100 ? 0 : completed+1 } )
    }

    render() {
      const { classes } = this.props;
      
      return (
        <div>
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
                { this.state.customers ? this.state.customers.map(c => 
                    { return( <Customer key={c.id} id={c.id} name={c.name} image={c.image} gender={c.gender} birthday={c.birthday} job={c.job} /> ) }
                  ) : 
                  <TableRow>
                    <TableCell colSpan="6" align="center">
                      <CircularProgress className={classes.progress} variant="determinate" value={this.state.completed}></CircularProgress>
                    </TableCell>
                  </TableRow>
                  }
              </TableBody>
            </Table>
          </Paper>
          <CustomerAdd stateRefresh={this.stateRefresh}/>
        </div>
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
