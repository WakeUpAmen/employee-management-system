import React, {Component} from 'react';
import {Link, Redirect} from 'react-router-dom';
import * as actions from '../../actions';
import {connect} from 'react-redux';
import {Form, FormGroup, FormControl,ControlLabel, Button, DropdownButton, MenuItem,Image} from 'react-bootstrap';



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
            managerName: this.props.managerName,
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
    managerChange=(eventKey, e)=>{
        this.props.setManager(eventKey);
        this.props.setManagerName(e.target.innerHTML);
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
        return(
            <Form horizontal className="forms">
                <Button className="buttons" style={{width: "20%", float: "right"}} ><Link to={{ pathname: '/'  }}>Home</Link></Button>

                <FormGroup>
                <ControlLabel className="labels">Picture:</ControlLabel>
                <FormControl  type="file"  onChange={this.pictureChange}/>
                    {<Image src={this.props.picture} rounded />}
                </FormGroup>
                <FormGroup>
                    <ControlLabel className="labels">Name:</ControlLabel>
                    <FormControl className="input-textboxes" type="text" value = {this.props.name} onChange={this.nameChange}/>
                </FormGroup>
                <FormGroup>
                    <ControlLabel className="labels">Title:</ControlLabel>
                    <FormControl className="input-textboxes" type="text" value = {this.props.title} onChange={this.titleChange} />
                </FormGroup>
                <FormGroup>
                    <ControlLabel className="labels">Sex:</ControlLabel>
                    <FormControl className="input-textboxes" type="text" value = {this.props.sex} onChange={this.sexChange} />
                </FormGroup>
                <FormGroup>
                    <ControlLabel className="labels">Office Phone:</ControlLabel>
                    <FormControl className="input-textboxes" type="text" value = {this.props.officePhone} onChange={this.officePhoneChange}/>
                </FormGroup>
                <FormGroup>
                    <ControlLabel className="labels">Cell Phone:</ControlLabel>
                    <FormControl className="input-textboxes" type="text" value = {this.props.cellPhone} onChange={this.cellPhoneChange}/>
                </FormGroup>
                <FormGroup>
                    <ControlLabel className="labels">SMS:</ControlLabel>
                    <FormControl className="input-textboxes" type="text" value = {this.props.SMS} onChange={this.SMSChange}/>
                </FormGroup>
                <FormGroup>
                    <ControlLabel className="labels">Email:</ControlLabel>
                    <FormControl className="input-textboxes" type="text" value = {this.props.email} onChange={this.emailChange}/>
                </FormGroup>
                <FormGroup>
                    <ControlLabel className="labels">Reporters:</ControlLabel>
                    <FormControl className="input-textboxes" type="text" value = {this.props.children} onChange={this.childrenChange}/>
                </FormGroup>
                <FormGroup>
                    <ControlLabel className="labels">Manager:</ControlLabel><br/>
                    <DropdownButton
                        bsStyle="default"
                        title={this.props.managerName == null? "------":this.props.managerName}  
                    >
                    <MenuItem eventKey={null} onSelect={this.managerChange} >----</MenuItem>
                    {
                        this.props.employees.map(employee=>{
                            return <MenuItem eventKey={employee._id} onSelect={this.managerChange} >{employee.name}</MenuItem>
                        })
                    }
                    </DropdownButton>
                </FormGroup>
                <FormGroup>
                    <ControlLabel className="labels">Start Date:</ControlLabel>
                    <FormControl className="input-textboxes" type="text" value = {this.props.startDate} onChange={this.startDateChange}/><br/>
                </FormGroup>
                <Button className="buttons" onClick ={this.getEmployeeInfo} >Save User</Button>  
                {this.props.editEmployeeCompleted && <Redirect to={{pathname: '/', state: {from: this.props.location} }}/>}
            </Form>
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
        managerName: state.editEmployeeR.managerName,
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
        setManagerName:(text)=>{dispatch(actions.setManagerName(text))},

      })
};

export default connect(mapStateToProps, mapDispatchToProps)(EditEmployee);