import React, {Component} from 'react';
import {Link, Redirect} from 'react-router-dom';
import * as actions from '../../actions';
import {connect} from 'react-redux';

class NewEmployee extends Component{
    constructor(props){
        super(props);
        this.state ={picture: "", name:"", title :"",sex:"",officePhone:"", cellPhone:"", SMS:"", email:"",children:"",manager:"", startDate:""};     
    } 
    getEmployeeInfo = () => {
        let employee ={
            picture:this.state.picture,
            name: this.state.name,
            title: this.state.title,
            sex: this.state.sex,
            officePhone: this.state.officePhone,
            cellPhone: this.state.cellPhone,
            SMS: this.state.SMS,
            email: this.state.email,
            children: this.state.children,
            manager: this.state.manager,
            startDate: this.state.startDate
        }
        this.props.addOneToServer(employee);    
    }
    pictureChange=(e)=>{
        this.setState({picture: e.target.value});
    }
    nameChange=(e)=>{
        this.setState({name: e.target.value});
    }
    titleChange=(e)=>{
        this.setState({title: e.target.value});
    }
    sexChange=(e)=>{
        this.setState({sex: e.target.value});
    }
    officePhoneChange=(e)=>{
        this.setState({officePhone: e.target.value});
    }
    cellPhoneChange=(e)=>{
        this.setState({cellPhone: e.target.value});
    }

    SMSChange=(e)=>{
        this.setState({SMS: e.target.value});
    }
    emailChange=(e)=>{
        this.setState({email: e.target.value});
    }
    childrenChange=(e)=>{
        this.setState({children: e.target.value});
    }
    managerChange=(e)=>{
        this.setState({manager: e.target.value});
    }
    startDateChange=(e)=>{
        this.setState({startDate: e.target.value});
    }
    render (){
        return(
            <div className="div-container">
                <label className="labels">Picture:</label>
                <input className="input-textboxes" type="text" value = {this.state.picture} onChange={this.pictureChange}/><br/>
                <label className="labels">Name:</label>
                <input className="input-textboxes" type="text" value = {this.state.name} onChange={this.nameChange}/><br/>
                <label className="labels">Title:</label>
                <input className="input-textboxes" type="text" value = {this.state.title} onChange={this.titleChange}/><br/>
                <label className="labels">Sex:</label>
                <input className="input-textboxes" type="text" value = {this.state.sex} onChange={this.sexChange}/><br/>
                <label className="labels">Office Phone:</label>
                <input className="input-textboxes" type="text" value = {this.state.officePhone} onChange={this.officePhoneChange}/><br/>
                <label className="labels">Cell Phone:</label>
                <input className="input-textboxes" type="text" value = {this.state.cellPhone} onChange={this.cellPhoneChange}/><br/>
                <label className="labels">SMS:</label>
                <input className="input-textboxes" type="text" value = {this.state.SMS} onChange={this.SMSChange}/><br/>
                <label className="labels">Email:</label>
                <input className="input-textboxes" type="text" value = {this.state.email} onChange={this.emailChange}/><br/>
                <label className="labels">Reportors:</label>
                <input className="input-textboxes" type="text" value = {this.state.children} onChange={this.childrenChange}/><br/>
                <label className="labels">Manager:</label>
                <input className="input-textboxes" type="text" value = {this.state.manager} onChange={this.managerChange}/><br/>
                <label className="labels">Start Date:</label>
                <input className="input-textboxes" type="text" value = {this.state.startDate} onChange={this.startDateChange} /><br/>
                <button className="buttons" onClick ={this.getEmployeeInfo} >Add Employee</button>  
                {this.props.newEmployeeCompleted && <Redirect to={{pathname: '/', state: {from: this.props.location} }}/>}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        hasError: state.myEmployeeListR.hasError,
        newEmployeeCompleted: state.myEmployeeListR.newEmployeeCompleted,
    }
};

function mapDispatchToProps(dispatch) {
    return({
        addOneToServer:(data) =>{ dispatch(actions.addOneToServer(data))},
      })
};

export default connect(mapStateToProps, mapDispatchToProps)(NewEmployee);