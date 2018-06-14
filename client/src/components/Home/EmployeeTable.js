import React, {Component} from 'react';
import EmployeeRow from './EmployeeRow';
import * as actions from '../../actions';
import {connect} from 'react-redux';


class EmployeeTable extends Component {
    constructor(props){
        super(props);
    }

    editRowCallBack=()=>{
        this.props.callbackFromRoot_edit();
    }

    render() {
        const rows = [];
        this.props.employees.forEach((employee) => {
            if (employee.name.indexOf(this.props.filterText) !== -1 ) {
                rows.push( <EmployeeRow 
                                _id = {employee._id}
                                name ={employee.name} 
                                title ={employee.title}
                                sex ={employee.sex} 
                                officePhone = {employee.officePhone} 
                                cellPhone ={employee.cellPhone}
                                SMS = {employee.SMS}
                                email = {employee.email}
                                picture ={employee.picture}
                                children ={employee.children.length}
                                manager ={employee.manager}
                                managerName ={employee.managerName}
                                startDate={employee.startDate}
                                editRow={this.props.editRowCallBack} 
                                deleteRow ={this.props.deleteOneEmployee} 
                                // deleteEmployeeCompleted={this.props.deleteEmployeeCompleted}
                                />
                );
            } 
        });

        return (
            <div className="div-container">
            <table className="table-table">
                <thead>
                    <tr>
                        <th>Edit</th>
                        <th>Delete</th>
                        <th /*onClick ={() => this.props.pictureSort("officePhone")}*/ >Picture</th>
                        <th onClick ={() =>this.props.nameSort("name")} >Name</th>
                        <th onClick ={()=>this.props.titleSort("title")} >Title</th>
                        <th onClick ={() =>this.props.sexSort("sex")} >Sex</th>
                        <th onClick ={() => this.props.officePhoneSort("officePhone")} >Office Phone</th>
                        <th onClick ={() => this.props.cellPhoneSort("cellPhone")} >Cell Phone</th>
                        <th onClick ={() => this.props.SMSSort("SMS")} >SMS</th>
                        <th onClick ={() => this.props.emailSort("email")} >Email</th>
                        <th onClick ={() => this.props.childrenSort("children")} >Reportor</th>
                        <th onClick ={() => this.props.managerSort("manager")} >Manager</th>
                        <th onClick ={() => this.props.startDateSort("startDate")} >startDate</th>
                    </tr>
                </thead>
                <tbody>{rows}</tbody>
            </table>
            </div>
        );
    }
}

const mapStateToProps = state => {
    console.log("home map, state.employees")
    return {
        filterText: state.myEmployeeListR.filterText,
        employees: state.myEmployeeListR.employees,
    }
};

function mapDispatchToProps(dispatch) {
    return({
        getAllEmployeesFromServer: () =>{dispatch(actions.getAllEmployeesFromServer())},
      })
};

export default connect(mapStateToProps, mapDispatchToProps)(EmployeeTable);