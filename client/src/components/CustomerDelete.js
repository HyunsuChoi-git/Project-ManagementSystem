import React from 'react'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';


class CustomerDelete extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            open: false
        }
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
                open : false
            })
    }


    deleteCustomer(id){
        const url = '/api/customers/'+ id;
        fetch(url, {
            method: 'DELETE'
        });
        this.props.stateRefresh();
    }

    render(){
        return (
            <div>
                <Button variant="contained" color="secondary" onClick={this.handleClickOpen}>삭제</Button>
                <Dialog open={this.state.open} >
                    <DialogTitle>
                        삭제 경고
                    </DialogTitle>
                    <DialogContent>
                        <Typography gutterBottom>
                            선택한 고객 정보가 삭제됩니다.
                        </Typography>
                    </DialogContent>
                    <DialogActions>
                        <Button variant="contained" color="primary" onClick={(e) => this.deleteCustomer(this.props.id)}>삭제</Button>
                        <Button variant="outlined" color="primary" onClick={this.handleClose}>닫기</Button>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }

}


export default CustomerDelete;