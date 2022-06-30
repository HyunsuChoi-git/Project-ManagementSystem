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
import { fade, withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';


function styles(theme) {
  return ({
    root: {
      width: '100%',
      marginTop: theme.spacing(3),
      minwidth:1080 //overflowX: "auto"min
    },
    menu: {
      marginTop: 8,
      marginBottom: 8,
      display: 'flex',
      justifyContent: 'center'
    },
    paper: {
      marginLeft: 8,
      marginRight: 8,
    },
    tableHead: {
      fontSize: '1.0rem'
    },
    progress: {
      margin: theme.spacing(2)
    },
    grow: {
      flexGrow: 1,
    },
    menuButton: {
      marginLeft: -12,
      marginRight: 20,
    },
    title: {
      display: 'none',
      [theme.breakpoints.up('sm')]: {
        display: 'block',
      }
    },
    search: {
      position: 'relative',
      borderRadius: theme.shape.borderRadius,
      backgroundColer: fade(theme.palette.common.white, 0.15),
      '&:hover': {
        backgroundColer: fade(theme.palette.common.white, 0.25),
      },
      marginLeft: 0,
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing.unit,
        with: 'auto',
      },
    },
    searchIcon: {
      width: theme.spacing.unit*9,
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    inputRoot: {
      color: 'inherit',
      width: '100%',
    },
    inputInput: {
      paddingTop: theme.spacing.unit,
      paddingRight: theme.spacing.unit,
      paddingBottom: theme.spacing.unit,
      paddingLeft: theme.spacing.unit*10,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        width: 120,
        '&:focus': {
          width: 200,
        }
      }
    }

  });
}





class App extends Component{
    constructor(props){
      super(props);
      this.state = {
        customers : '',
        completed : 0,
        searchKeyword : '',
      }
    }

    handleValueChange = (e) => {
      let nextState = {};
      nextState[e.target.name] = e.target.value;
      this.setState(nextState);
    }

    stateRefresh = () => {
      this.setState({
        customers : '',
        completed : 0,
        searchKeyword : '',
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
      //검색키워드가 있을 때에는 검색데이터만. 아닐경우 전체.
      const filteredComponents = (data) => {
        data = data.filter((c) => {
          return c.name.indexOf(this.state.searchKeyword) > -1; //사용자가 검색한 키워드가 파라미터로 받은 data내에 존재하면 그 데이터만 출력되도록 data변수 초기화
        });
        return data.map(c => { return (<Customer stateRefresh={this.stateRefresh} key={c.id} id={c.id} name={c.name} image={c.image} gender={c.gender} birthday={c.birthday} job={c.job} />); 
        });
      }

      const { classes } = this.props;
      const cellList = ["번호", "이미지", "이름", "생년월일", "성별","직업","설정"]
      
      return (
        <div className={classes.root}>
          <AppBar position="static">
            <Toolbar>
              <IconButton className={classes.menuButton} color="inherit" aria-label="open drawer">
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" color="inherit" noWrap >
                고객 정보 시스템
              </Typography>
              <div className={classes.grow} />
              <div className={classes.search} >
                <div className={classes.searchIcon} >
                  <SearchIcon />
                </div>
                <InputBase 
                  placeholder='Search..' 
                  classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput,
                  }}
                  name='searchKeyword'  // 실제 입력된 키워드
                  value={this.state.searchKeyword} 
                  onChange={this.handleValueChange} />
              </div>
            </Toolbar>
          </AppBar>
          <div className={classes.menu}>
            <CustomerAdd stateRefresh={this.stateRefresh} />
          </div>
          <Paper className={classes.paper}>
            <Table className={classes.table}>
              <TableHead>
                <TableRow>
                  {cellList.map(c => {
                    return <TableCell className={classes.tableHead}>{c}</TableCell>
                  })}
                  
                </TableRow>
              </TableHead>
              <TableBody>
                {this.state.customers ? 
                  filteredComponents(this.state.customers) : 
                  <TableRow>
                    <TableCell colSpan="6" align="center">
                      <CircularProgress className={classes.progress} variant="determinate" value={this.state.completed}></CircularProgress>
                    </TableCell>
                  </TableRow>}
              </TableBody>
            </Table>
          </Paper>
          
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
