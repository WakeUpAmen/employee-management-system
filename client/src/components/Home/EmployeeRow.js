import React, {Component} from 'react';
import {Link} from 'react-router-dom';
class EmployeeRow extends Component {
    render() {
        return (
            <tr>
                <td><button className="buttons"><Link to={{ pathname: `/editemployee/${this.props._id}` }}>Edit</Link></button></td>
                <td><button className="buttons"  onClick ={()=>this.props.deleteRow(this.props._id)} >Delete</button></td>
                <td>{this.props.picture}</td>
                <td>{this.props.name}</td>
                <td>{this.props.title}</td>
                <td>{this.props.sex}</td>
                <td>{this.props.officePhone}</td>
                <td>{this.props.cellPhone}</td>
                <td>{this.props.SMS}</td>
                <td>{this.props.email}</td>
                <td>{this.props.children}</td>
                <td>{this.props.manager}</td>
                <td>{this.props.startDate}</td>
            </tr>
        );
    }
}

export default EmployeeRow;