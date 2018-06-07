import React, {Component} from 'react';
import {Link, Redirect} from 'react-router-dom';
import * as actions from '../../actions';
import {connect} from 'react-redux';

class NewEmployee extends Component{
    constructor(props){
        super(props);
        this.state ={picture: "", name:"", title :"",sex:"",officePhone:"", cellPhone:"", SMS:"", email:"",children:"",manager:"", startDate:""};     
    } 
    getUserInfo = () => {
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
    fnchange=(e)=>{
        this.setState({firstname: e.target.value});
    }
    lnchange=(e)=>{
        this.setState({lastname: e.target.value});
    }
    sexchange=(e)=>{
        this.setState({sex: e.target.value});
    }
    agechange=(e)=>{
        this.setState({age: e.target.value});
    }
    pwdchange=(e)=>{
        this.setState({pwd: e.target.value});
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