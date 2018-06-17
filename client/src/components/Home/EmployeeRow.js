import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import * as actions from '../../actions';
import {Button} from 'react-bootstrap';


class EmployeeRow extends Component {

    render() {
        return (
            <tr>
                <td><Button className="buttons"><Link to={{ pathname: `/editemployee/${this.props._id}` }}>Edit</Link></Button></td>
                <td><Button className="buttons"  onClick ={()=>this.props.deleteRow(this.props._id)} >Delete</Button></td>
                <td><img width="50px" src={this.props.picture}/></td>
                <td>{this.props.name}</td>
                <td>{this.props.title}</td>
                <td>{this.props.sex}</td>
                <td> <a href={`tel:${this.props.officePhone}`}>{this.props.officePhone}</a></td>
                <td>{this.props.cellPhone}</td>
                <td>{this.props.SMS}</td>
                <td><a href={`mailto:${this.props.email}`}>{this.props.email}</a></td>
                {
                    this.props.children != 0? <td><Link to={{ pathname: `/children/${this.props._id}`  }}>{this.props.children}</Link></td>:
                    <td>{this.props.children}</td>
                }
                {
                    this.props.manager === null? <td>------</td>:
                    <td><Link to={{ pathname: `/editemployee/${this.props.manager}` }}>{this.props.managerName}</Link></td>
                }
                <td>{this.props.startDate}</td>
            </tr>
        );
    }
}



// export default connect(mapStateToProps, mapDispatchToProps)(EmployeeRow);

export default EmployeeRow;