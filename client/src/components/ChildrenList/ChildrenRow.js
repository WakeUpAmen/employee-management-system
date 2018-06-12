import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {Button} from 'react-bootstrap';
class ChildrenRow extends Component {
    render() {
        return (
            <tr>
                <td><Button><Link to={{ pathname: `/editemployee/${this.props._id}` }}>Edit</Link></Button></td>
                <td><Button onClick ={()=>this.props.deleteRow(this.props._id)} >Delete</Button></td>
                <td><img src={this.props.picture}/></td>
                <td>{this.props.name}</td>
                <td>{this.props.title}</td>
                <td>{this.props.sex}</td>
                <td> <a href={`tel:${this.props.officePhone}`}>{this.props.officePhone}</a></td>
                <td> <a href={`tel:${this.props.cellPhone}`}>{this.props.cellPhone}</a></td>
                <td>{this.props.SMS}</td>
                <td><a href={`mailto:${this.props.email}`}>{this.props.email}</a></td>
                {
                    this.props.children != 0? <td><Link to={{ pathname: `/children/${this.props._id}`  }}>{this.props.children}</Link></td>:
                    <td>{this.props.children}</td>
                }
                {
                    this.props.manager === null? <td>------</td>:
                    <td><Link to={{ pathname: `/editemployee/${this.props._id}` }}>{this.props.manager}</Link></td>
                }
                <td>{this.props.startDate}</td>
            </tr>
        );
    }
}

export default ChildrenRow;