import React, { Component } from 'react';
import {connect} from 'react-redux';
import Pages from './Pages';
import SearchBar from './SearchBar';
import EmployeeTable from './EmployeeTable';
import * as actions from '../../actions';
import {BrowserRouter, Route, Link, Switch, Redirect} from 'react-router-dom';

class Home extends Component {
    componentDidMount(){
        console.log("home did mount")
        this.props.getAllEmployeesFromServer();
        this.props.editEmployeeCompleted(false);
        this.props.newEmployeeCompleted(false);
    }
    handleFilterTextChange = (filterText) => {
        this.props.setFilterText(filterText);
    }

    deleteOneEmployee = (index)=>{
        this.props.deleteOneEmployee(index);
    }
    setSort =(str)=>{
        this.props.setSort(str);
    }
    getPageEmployees=(page)=>{
        this.props.getPageEmployees(page);
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
                <SearchBar filterText={this.props.filterText} onFilterTextChange={this.handleFilterTextChange}/>
                <EmployeeTable
                    employees={this.props.pageEmployees}
                    filterText={this.props.filterText}
                    deleteOneEmployee={this.deleteOneEmployee}
                    itemNum = {5}
                    page = {this.props.page}
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
                    // deleteUserCompleted={this.props.deleteUserCompleted}
                />
                <Pages 
                    minusOnepage = {this.props.minusOnepage} 
                    addOnePage = {this.props.addOnePage} 
                    page = {this.props.page} 
                    pages={this.props.filteredEmployees.length/5 == Math.floor(this.props.filteredEmployees.length/5)? this.props.filteredEmployees.length/5 : Math.floor(this.props.filteredEmployees.length/5)+ 1}
                    getPageEmployees={this.getPageEmployees}
                />
                <button className="buttons" ><Link to="/newemployee">Cerate new user</Link></button>
            </div>
        );
    }
}

const mapStateToProps = state => {
    console.log("home index")
    console.log(state.users)
    return {
        // users: state.myUserListR.users,
        filteredEmployees: state.myEmployeeListR.filteredEmployees,
        pageEmployees: state.myEmployeeListR.pageEmployees,
        filterText: state.myEmployeeListR.filterText,
        page: state.myEmployeeListR.page,
        hasErrored: state.myEmployeeListR.hasError,
        dataLoading: state.myEmployeeListR.dataLoading,
        // deleteUserCompleted: state.deleteUserCompleted,
    }
};

function mapDispatchToProps(dispatch) {
    console.log("home dispatch")
    return({
        setFilterText:(text) =>{dispatch(actions.setFilterText(text))},
        addOnePage: () =>{dispatch(actions.pageIncrement)},
        minusOnepage:() =>{dispatch(actions.pageDecrement)},
        setSort:(str) =>{actions.setSort.str=str, dispatch(actions.setSort)},
        getAllEmployeesFromServer: () =>{dispatch(actions.getAllEmployeesFromServer())},
        deleteOneEmployee:(id) =>{dispatch(actions.deleteOneFromServer(id))},
        editEmployeeCompleted:(val) =>{dispatch(actions.editEmployeeCompleted(val))},
        newEmployeeCompleted:(val) => {dispatch(actions.newEmployeeCompleted(val))},
        getPageEmployees:(page)=>{dispatch(actions.getPageEmployees(page))},
        // deleteUserCompleted: (val) => {dispatch(actions.deleteUserCompleted(val))},
      })
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
