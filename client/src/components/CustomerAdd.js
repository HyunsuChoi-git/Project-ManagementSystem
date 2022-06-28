import React from 'react';
import { post } from 'axios';   // post방식으로 클라이언트로부터 서버로 데이터를 받기 위함
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    hidden: {
        display: 'none'
    }
})



class CustomerAdd extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            file: null,  //프로필이미지 btye 형태
            username : '',
            birthday : '',
            gender : '',
            job : '',
            filename : '',

            open : false  //다이얼로그 창 여부
        }
    }

    // 고객추가 버튼 이벤트
    hadleFormSubmit = (e) => {
        e.preventDefault(); // 데이터가 서버로 전달됨에 있어서 오류가 발생하지 않도록 해주는 함수
        this.addCustomer() 
            .then((response) => {
                console.log(response.data);
                //고객정보 업데이트 시, 페이징하지 않고 고객정보를 다시 불러와 업데이트 하는 방법으로 single page application 구현
                this.props.stateRefresh();
            });
            this.setState({ // 변수 초기화
                file: null,  
                username : '',
                birthday : '',
                gender : '',
                job : '',
                filename : '',

                open : false
            })
        //window.location.reload();

        
    }

    // 고객추가 중 이미지 추가 이벤트
    handelFileChange = (e) => {
        this.setState({
            file: e.target.files[0],  // 기본적으로 사용자가 다중 파일을 선택할 수 있을 때, 첫번째 파일만 가져오기
            filename: e.target.value
        });
    }

    // 고객추가 중 글씨 입력 이벤트
    handleValueChange = (e) => {
        let nextState = {};
        nextState[e.target.name] = e.target.value;  // state 값 변경해주기
        this.setState(nextState);
    }

    // server로 고객정보 보내기
    addCustomer = () => {
        const url = '/api/customers';  // 데이터를 보낼 주소
        const formData = new FormData();  // 데이터를 담을 객체
        formData.append('image', this.state.file);
        formData.append('name', this.state.username);
        formData.append('birthday', this.state.birthday);
        formData.append('gender', this.state.gender);
        formData.append('job', this.state.job);

        //파일이 포함된 데이터를 보낼 때에는 map표준에 맞는 header를 추가해주어야한다
        const config = { headers: { 'content-type' : 'multipart/form-data' } }
        console.log(url)
        return post(url, formData, config); 
    }

    // 고객추가 버튼 시 모달 창 오픈
    handleClickOpen = () => {
        this.setState({
            open: true
        })
    }
    // 모달 창 오픈 중, 닫기 버튼 누르면 모달 창 close
    handleClose = () => {
        this.setState({ // 변수 초기화
                file: null,  
                username : '',
                birthday : '',
                gender : '',
                job : '',
                filename : '',

                open : false
            })
    }




    render() {
        const { classes } = this.props;

        return (
            <div>
                <Button variant="contained" color="primary" onClick={ this.handleClickOpen}>
                    고객 추가하기
                </Button>
                <Dialog open={this.state.open} >
                    <DialogTitle>고객 추가</DialogTitle>
                    <DialogContent>
                        <input className={classes.hidden} accept="image/*" id="raised-button-file" type="file" file={this.state.file} value={this.state.filename} onChange={(e) => this.handelFileChange(e)} /><br/>
                        <label htmlFor="raised-button-file">
                            <Button variant="contained" color="primary"  component="span" name="file">
                                {this.state.filename === "" ? "프로필 이미지 선택" : this.state.filename}
                            </Button>
                        </label><br/>
                        <TextField label="이름" type="text" name="username" value={this.state.username} onChange={(e) => this.handleValueChange(e)}/><br/>
                        <TextField label="생일" type="text" name="birthday" value={this.state.birthday} onChange={(e) => this.handleValueChange(e)}/><br/>
                        <TextField label="성별" type="text" name="gender" value={this.state.gender} onChange={(e) => this.handleValueChange(e)}/><br/>
                        <TextField label="직업" type="text" name="job" value={this.state.job} onChange={(e) => this.handleValueChange(e)}/><br/>
                        <DialogActions>
                            <Button variant="contained" color="primary" onClick={(e) => this.hadleFormSubmit(e)}>추가하기</Button>
                            <Button variant="outlined" color="primary" onClick={this.handleClose}>닫기</Button>
                        </DialogActions>

                    </DialogContent>
                </Dialog>
            </div>
            // <form onSubmit={(e) => this.hadleFormSubmit(e)}>
            //     <h1>고객 추가</h1>
            //     프로필 이미지: <input type="file" name="file" file={this.state.file} value={this.state.filename} onChange={(e) => this.handelFileChange(e)} /><br/>
            //     이름: <input type="text" name="username" value={this.state.username} onChange={(e) => this.handleValueChange(e)}/><br/>
            //     생년월일: <input type="text" name="birthday" value={this.state.birthday} onChange={(e) => this.handleValueChange(e)}/><br/>
            //     성별: <input type="text" name="gender" value={this.state.gender} onChange={(e) => this.handleValueChange(e)}/><br/>
            //     직업: <input type="text" name="job" value={this.state.job} onChange={(e) => this.handleValueChange(e)}/><br/>
            //     <button type="submit">추가하기</button>
            // </form>
        )
    }


}

// export default CustomerAdd;
export default withStyles(styles)(CustomerAdd);