import React, { Component } from 'react';
import {connect} from 'react-redux';
import SearchBar from './SearchBar';
import EmployeeTable from './EmployeeTable';
import * as actions from '../../actions';
import {BrowserRouter, Route, Link, Switch, Redirect} from 'react-router-dom';
import ScrollArea from'react-scrollbar';
import{Button} from 'react-bootstrap';



class Home extends Component {
    constructor(props){
        super(props);
        this.state={didUpdate:false}
    }
    componentDidMount(){
        console.log("home did mount")
        this.props.getAllEmployeesFromServer();
        this.props.editEmployeeCompleted(false);
        this.props.newEmployeeCompleted(false);
    }
    // componentDidUpdate(){
    //     console.log("did update:"+this.state.didUpdate)
    //     if(this.state.didUpdate === true){
    //         this.props.getAllEmployeesFromServer();
    //         this.setState({didUpdate: false})
    //     }
    // }
    handleFilterTextChange = (filterText) => {
        this.props.setFilterText(filterText);
    }

    deleteOneEmployee = (index)=>{
        this.props.deleteOneEmployee(index);
        // this.setState({didUpdate: true});
    }
    setSort =(str)=>{
        this.props.setSort(str);
    }

    render() {
        if (this.props.hasErrored) {
            return <p>Sorry! There was an error loading the items</p>;
        }
        if (this.props.dataLoading) {
            return <p>Loading…</p>;
        }
        return (
            <div className="div-container">
                <div style={{width: "60%", float: "left"}}>
                    <SearchBar  filterText={this.props.filterText} onFilterTextChange={this.handleFilterTextChange}/>
                </div>
                <div classname="div-container" style={{width: "40%", float: "right"}}>
                    <Button  className="buttons" ><Link to="/newemployee">Create new user</Link></Button>
                    <Button className="buttons" style={{width: "20%", float: "right"}} ><Link to={{ pathname: '/'  }} onClick={this.props.getAllEmployeesFromServer}>Show All</Link></Button>
                </div>
                <ScrollArea speed={0.8} className="area"   horizontal={true} vertical ={true}>
                    <EmployeeTable 
                        filterText={this.props.filterText}
                        deleteOneEmployee={this.deleteOneEmployee}
                        itemNum = {10}
                        nameSort ={this.setSort}
                        titleSort={this.setSort}
                        sexSort={this.setSort}
                        officePhoneSort={this.setSort}
                        cellPhoneSort={this.setSort}
                        SMSSort={this.setSort}
                        emailSort={this.setSort}
                        childrenSort={this.setSort}
                        managerSort={this.setSort}
                        startDateSort={this.setSort}
                    />
                </ScrollArea>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        filterText: state.myEmployeeListR.filterText,
        hasErrored: state.myEmployeeListR.hasError,
        dataLoading: state.myEmployeeListR.dataLoading,
    }
};

function mapDispatchToProps(dispatch) {
    return({
        setFilterText:(text) =>{dispatch(actions.setFilterText(text))},
        setSort:(str) =>{dispatch(actions.setSort(str))},
        getAllEmployeesFromServer: () =>{dispatch(actions.getAllEmployeesFromServer())},
        deleteOneEmployee:(id) =>{dispatch(actions.deleteOneFromServer(id))},
        editEmployeeCompleted:(val) =>{dispatch(actions.editEmployeeCompleted(val))},
        newEmployeeCompleted:(val) => {dispatch(actions.newEmployeeCompleted(val))},
      })
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
