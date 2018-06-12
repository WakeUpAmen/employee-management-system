import React, {Component} from 'react';
import {Link, Redirect} from 'react-router-dom';
import * as actions from '../../actions';
import {connect} from 'react-redux';
import {Form, FormGroup, FormControl,ControlLabel, Button, DropdownButton, MenuItem} from 'react-bootstrap';



class EditEmployee extends Component{
    constructor(props){
        super(props);
        this.state={file:"", imagePreviewUrl:"", offsprings:[]}
    } 
    componentWillMount=()=>{
        this.props.getEmployeeByIdFromServer(this.props.match.params.employeeId);
        // this.getOffsprings(this.props.match.params.employeeId);
        // this.props.getOffspringsByIdFromServer(this.props.match.params.employeeId);
    }
    getEmployeeInfo = () => {
        let employee ={
            picture: this.props.picture, 
            name: this.props.name, 
            title: this.props.title, 
            sex: this.props.sex, 
            officePhone: this.props.officePhone,
            cellPhone: this.props.cellPhone,
            SMS: this.props.SMS,
            email: this.props.email,
            children: this.props.children,
            manager: this.props.manager,
            startDate: this.props.startDate,
        }
        this.props.updateOneToServer(this.props.match.params.employeeId, employee);
    }
    pictureChange=(e)=>{
        e.preventDefault();
        let reader = new FileReader();
        let file = e.target.files[0];
        reader.onloadend = () => {
            this.props.setPicture(reader.result);
        }
        reader.readAsDataURL(file);
    }
    nameChange=(e)=>{
        this.props.setName(e.target.value);
    }
    titleChange =(e)=>{
        this.props.setTitle(e.target.value);
    }
    sexChange=(e)=>{
        this.props.setSex(e.target.value);
    }
    officePhoneChange=(e)=>{
        this.props.setOfficePhone(e.target.value);
    }
    cellPhoneChange=(e)=>{
        this.props.setCellPhone(e.target.value);
    }
    SMSChange=(e)=>{
        this.props.setSMS(e.target.value);
    }
    emailChange=(e)=>{
        this.props.setEmail(e.target.value);
    }
    childrenChange=(e)=>{
        this.props.setChildren(e.target.value);
    }
    managerChange=(e)=>{
        this.props.setManager(e.target.value);
    }
    startDateChange=(e)=>{
        this.props.setStartDate(e.target.value);
    }
    // getOffsprings=(id)=>{
    //     let aa = this.props.employees.filter(em=> String(em._id) == String(id))
    //     console.log(aa[0])
    //     let queue = [...this.props.employees.filter(em=> String(em._id) == String(id))[0].children];
    //     console.log("queue:"+queue)
    //     let res = [...this.props.employees.filter(em=>String(em._id) == String(id))[0].children];
    //     while(queue.length > 0){
    //         let tmpId = queue.shift();
    //         res = [...res, this.props.employees.filter(em=>String(em._id) == String(id))[0].children];
    //         queue = [...queue,this.props.employees.filter(em=>String(em._id) == String(id))[0].children];
    //     }
    //     return res;
    // }
    render (){
        // console.log("render")
        // let offsprings = this.getOffsprings(this.props.match.params.employeeId)
        return(
            <div className="div-container">
                <label className="labels">Picture:</label>
                <input className="input-textboxes" type="file"  onChange={this.pictureChange}/>
                <div>
                    {<img src={this.props.picture} />}
                </div>
                <label className="labels">Name:</label>
                <input className="input-textboxes" type="text" value = {this.props.name} onChange={this.nameChange}/><br/>
                <label className="labels">Title:</label>
                <input className="input-textboxes" type="text" value = {this.props.title} onChange={this.titleChange} /><br/>
                <label className="labels">Sex:</label>
                <input className="input-textboxes" type="text" value = {this.props.sex} onChange={this.sexChange} /><br/>
                <label className="labels">Office Phone:</label>
                <input className="input-textboxes" type="text" value = {this.props.officePhone} onChange={this.officePhoneChange}/><br/>
                <label className="labels">Cell Phone:</label>
                <input className="input-textboxes" type="text" value = {this.props.cellPhone} onChange={this.cellPhoneChange}/><br/>
                <label className="labels">SMS:</label>
                <input className="input-textboxes" type="text" value = {this.props.SMS} onChange={this.SMSChange}/><br/>
                <label className="labels">Email:</label>
                <input className="input-textboxes" type="text" value = {this.props.email} onChange={this.emailChange}/><br/>
                <label className="labels">Reporters:</label>
                <input className="input-textboxes" type="text" value = {this.props.children} onChange={this.childrenChange}/><br/>
                <label className="labels">Manager:</label>
                <DropdownButton
                    bsStyle="default"
                    title={this.props.manager}
                >
                <MenuItem eventKey={null} onSelect={this.managerChange} >----</MenuItem>
                {
                    this.props.employees.map(employee=>{
                        return <MenuItem eventKey={employee._id} onSelect={this.managerChange} >{employee.name}</MenuItem>
                    })
                }
                </DropdownButton><br/>
                {/* <input className="input-textboxes" type="text" value = {this.props.manager} onChange={this.managerChange}/><br/> */}
                <label className="labels">Start Date:</label>
                <input className="input-textboxes" type="text" value = {this.props.startDate} onChange={this.startDateChange}/><br/>
                <button className="buttons" onClick ={this.getEmployeeInfo} >Save User</button>  
                {this.props.editEmployeeCompleted && <Redirect to={{pathname: '/', state: {from: this.props.location} }}/>}
            </div>
        );
    }
}

const mapStateToProps = state => {
    console.log("wothout:"+state.myEmployeeListR.withoutoffsprings)
    return {
        employees: state.myEmployeeListR.employees,
        withoutoffsprings: state.myEmployeeListR.withoutoffsprings,
        picture: state.editEmployeeR.picture,
        name: state.editEmployeeR.name,
        title: state.editEmployeeR.title,
        sex: state.editEmployeeR.sex,
        officePhone: state.editEmployeeR.officePhone,
        cellPhone: state.editEmployeeR.cellPhone,
        SMS: state.editEmployeeR.SMS,
        email: state.editEmployeeR.email,
        children: state.editEmployeeR.children,
        manager: state.editEmployeeR.manager,
        startDate: state.editEmployeeR.startDate,
        editEmployeeCompleted: state.myEmployeeListR.editEmployeeCompleted,
    }
};

function mapDispatchToProps(dispatch) {
    return({
        updateOneToServer:(id, employee) => {dispatch(actions.updateOneToServer(id, employee))},
        getEmployeeByIdFromServer:(id) => {dispatch(actions.getEmployeeByIdFromServer(id))},
        // getOffspringsByIdFromServer:(id) => {dispatch(actions.getOffspringsByIdFromServer(id))},
        setPicture:(text)=>{dispatch(actions.setPicture(text))},
        setName:(text) => {dispatch(actions.setName(text))},
        setTitle:(text) => {dispatch(actions.setTitle(text))},
        setSex:(text) => {dispatch(actions.setTitle(text))},
        setOfficePhone:(text) => {dispatch(actions.setOfficePhone(text))},
        setCellPhone:(text)=>{dispatch(actions.setCellPhone(text))},
        setSMS:(text) => {dispatch(actions.setSMS(text))},
        setEmail:(text) => {dispatch(actions.setEmail(text))},
        setChildren:(text) => {dispatch(actions.setChildren(text))},
        setManager:(text) => {dispatch(actions.setManager(text))},
        setStartDate:(text) => {dispatch(actions.setStartDate(text))},

      })
};

export default connect(mapStateToProps, mapDispatchToProps)(EditEmployee);