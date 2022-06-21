import React from 'react'
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';

class Customer extends React.Component {
    render() {
        return(
            <TableRow>
                <TableCell>{this.props.id}</TableCell>
                <TableCell><img src={this.props.image} alt="profile"></img></TableCell>
                <TableCell>{this.props.name}</TableCell>
                <TableCell>{this.props.birthday}</TableCell>
                <TableCell>{this.props.gender}</TableCell>
                <TableCell>{this.props.job}</TableCell>
            </TableRow>

        )
    }
}

export default Customer;


// class Customer extends React.Component {
//     render(){
//         // 항상 수행되는 내용이 들어감.
//         return (
//             <div>
//                 <CustomerProfile id={this.props.id} name={this.props.name} image={this.props.image} />
//                 <CustomerInfo birthday={this.props.birthday} gender={this.props.gender} job={this.props.job} />
                
//             </div>
//         // 컴포넌트를 class화 하여 두개의 컴포넌트로 만들어보기 (계층적 구성 react의 강력한 view 기능!!)
//         // (jsx문법) 리액트 요소를 반환할 때 두개 이상의 내부 데이터를 반환할 경우 div와 같은 태그로 감싸주어야 함 
//         )
//     }
// }

// class CustomerProfile extends React.Component {
//     render() {
//         return (
//             <div>
//                 <img src={this.props.image} alt="profile"/>
//                 <h2>{this.props.name}({this.props.id})</h2>
//             </div>
//         )
//     }
// }

// class CustomerInfo extends React.Component {
//     render(){
//         return(
//             <div>
//                 <p>{this.props.birthday}</p>
//                 <p>{this.props.gender}</p>
//                 <p>{this.props.job}</p>
//             </div>
//         )
//     }
// }

// export default Customer;