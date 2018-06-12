import React, { Component } from 'react';
import {connect} from 'react-redux';
import SearchBar from './SearchBar';
import ChildrenTable from './ChildrenTable';
import * as actions from '../../actions';
import {BrowserRouter, Route, Link, Switch, Redirect} from 'react-router-dom';

class ChildrenList extends Component {
    componentDidMount(){
        this.props.getEmployeeByIdFromServer(this.props.match.params.employeeId);
        this.props.editEmployeeCompleted(false);
    }
    deleteOneEmployee = (index)=>{
        this.props.deleteOneEmployee(index);
    }
    setSort =(str)=>{
        this.props.setSort(str);
    }

    render() {
        console.log("home render")
        if (this.props.hasErrored) {
            return <p>Sorry! There was an error loading the items</p>;
        }

        if (this.props.dataLoading) {
            return <p>Loading…</p>;
        }
        return (
            <div className="div-container">
                <SearchBar/>
                <ChildrenTable
                    filterText={this.props.filterText}
                    deleteOneEmployee={this.deleteOneEmployee}
                    itemNum = {10}
                    pictureSort = {this.pictureSort}
                    nameSort ={this.nameSort}
                    titleSort={this.titleSort}
                    sexSort={this.sexSort}
                    officePhoneSort={this.officePhoneSort}
                    cellPhoneSort={this.cellPhoneSort}
                    SMSSort={this.SMSSort}
                    emailSort={this.emailSort}
                    childrenSort={this.childrenSort}
                    managerSort={this.managerSort}
                    startDateSort={this.startDateSort}
                />
            </div>
        );
    }
}

const mapStateToProps = state => {
    console.log("home map, state.employees")
    return {
        filterText : state.myEmployeeListR.filterText,
        hasErrored: state.myEmployeeListR.hasError,
        dataLoading: state.myEmployeeListR.dataLoading,
        employees: state.myEmployeeListR.children,
    }
};

function mapDispatchToProps(dispatch) {
    return({
        getEmployeeByIdFromServer:(id) => {dispatch(actions.getEmployeeByIdFromServer(id))},
        setSort:(str) =>{actions.setSort.str=str, dispatch(actions.setSort)},
        deleteOneEmployee:(id) =>{dispatch(actions.deleteOneFromServer(id))},
        editEmployeeCompleted:(val) =>{dispatch(actions.editEmployeeCompleted(val))},
        newEmployeeCompleted:(val) => {dispatch(actions.newEmployeeCompleted(val))},
      })
};

export default connect(mapStateToProps, mapDispatchToProps)(ChildrenList);
