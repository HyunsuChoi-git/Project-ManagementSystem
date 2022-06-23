import React from 'react';
import { post } from 'axios';   // post방식으로 클라이언트로부터 서버로 데이터를 받기 위함

class CustomerAdd extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            file: null,  //프로필이미지 btye 형태
            username : '',
            birthday : '',
            gender : '',
            job : '',
            filename : ''
        }
    }


    hadleFormSubmit = (e) => {
        e.preventDefault(); // 데이터가 서버로 전달됨에 있어서 오류가 발생하지 않도록 해주는 함수
        this.addCustomer() 
            .then((response) => {
                console.log(response.data);
            });
            this.setState({ // 변수 초기화
                file: null,  
                username : '',
                birthday : '',
                gender : '',
                job : '',
                filename : ''
            })
        window.location.reload();

    }

    handelFileChange = (e) => {
        this.setState({
            file: e.target.files[0],  // 기본적으로 사용자가 다중 파일을 선택할 수 있을 때, 첫번째 파일만 가져오기
            filename: e.target.value
        });
    }

    handleValueChange = (e) => {
        let nextState = {};
        nextState[e.target.name] = e.target.value;  // state 값 변경해주기
        this.setState(nextState);
    }


    addCustomer = () => {
        const url = 'api/customers';  // 데이터를 보낼 주소
        const formData = new FormData();  // 데이터를 담을 객체
        formData.append('image', this.state.file);
        formData.append('name', this.state.username);
        formData.append('birthday', this.state.birthday);
        formData.append('gender', this.state.gender);
        formData.append('job', this.state.job);

        //파일이 포함된 데이터를 보낼 때에는 map표준에 맞는 header를 추가해주어야한다
        const config = { headers: { 'content-type' : 'multipart/form-data' } }

        return post(url, formData, config); 
    }

    render() {
        return (
            <form onSubmit={(e) => this.hadleFormSubmit(e)}>
                <h1>고객 추가</h1>
                프로필 이미지: <input type="file" name="file" file={this.state.file} value={this.state.filename} onChange={(e) => this.handelFileChange(e)} /><br/>
                이름: <input type="text" name="username" value={this.state.username} onChange={(e) => this.handleValueChange(e)}/><br/>
                생년월일: <input type="text" name="birthday" value={this.state.birthday} onChange={(e) => this.handleValueChange(e)}/><br/>
                성별: <input type="text" name="gender" value={this.state.gender} onChange={(e) => this.handleValueChange(e)}/><br/>
                직업: <input type="text" name="job" value={this.state.job} onChange={(e) => this.handleValueChange(e)}/><br/>
                <button type="submit">추가하기</button>
            </form>
        )
    }


}

export default CustomerAdd;