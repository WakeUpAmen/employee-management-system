import React, {Component} from 'react';
import {Link, Redirect} from 'react-router-dom';
import * as actions from '../../actions';
import {connect} from 'react-redux';
import {Form, FormGroup, FormControl,ControlLabel, Button, DropdownButton, MenuItem, Image} from 'react-bootstrap';


class NewEmployee extends Component{
    constructor(props){
        super(props);
        this.state ={file: "", imagePreviewUrl: "", name:"", title :"",sex:"",officePhone:"", cellPhone:"", SMS:"", email:"",children:"",manager:"manager name", startDate:"", name:""};     
    } 
    pictureChange=(e)=>{
        e.preventDefault();
        let reader = new FileReader();
        let file = e.target.files[0];
        reader.onloadend = () => {
            this.setState({
                file: file,
                imagePreviewUrl: reader.result
            });
        }
        reader.readAsDataURL(file);
        // console.log(this.state.imagePreviewUrl)
    }
    getEmployeeInfo = () => {
        let employee ={
            picture:this.state.imagePreviewUrl,
            name: this.state.name,
            title: this.state.title,
            sex: this.state.sex,
            officePhone: this.state.officePhone,
            cellPhone: this.state.cellPhone,
            SMS: this.state.SMS,
            email: this.state.email,
            children: [],
            manager: this.state.manager,
            managerName: this.state.managerName,
            startDate: this.state.startDate
        }
        this.props.addOneToServer(employee);    
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
    managerChange=(eventKey, e)=>{
        this.setState({manager: eventKey});
    }
    startDateChange=(e)=>{
        this.setState({startDate: e.target.value});
    }
    render (){
        let imagePreview = null;
        if (this.state.imagePreviewUrl) {
            imagePreview = (<Image src={this.state.imagePreviewUrl} rounded/>);
        } else {
            imagePreview = (<div className="previewText">Please select an Image for Preview</div>);
        }
        console.log(this.props.employees)
        return(
            <Form horizontal className="forms">
                <FormGroup>
                <ControlLabel className="labels">Picture:</ControlLabel>
                <FormControl className="input-textboxes" type="file"  onChange={this.pictureChange}/>
                    {imagePreview}
                </FormGroup>
                <FormGroup>
                    <ControlLabel className="labels">Name:</ControlLabel>
                    <FormControl className="input-textboxes" type="text" value = {this.state.name} onChange={this.nameChange}/>
                </FormGroup>
                <FormGroup>
                    <ControlLabel className="labels">Title:</ControlLabel>
                    <FormControl className="input-textboxes" type="text" value = {this.state.title} onChange={this.titleChange}/>
                </FormGroup>
                <FormGroup>
                    <ControlLabel className="labels">Sex:</ControlLabel>
                    <FormControl className="input-textboxes" type="text" value = {this.state.sex} onChange={this.sexChange}/>
                </FormGroup>
                <FormGroup>
                    <ControlLabel className="labels">OfficePhone:</ControlLabel>
                    <FormControl className="input-textboxes" type="text" value = {this.state.officePhone} onChange={this.officePhoneChange}/>
                </FormGroup>
                <FormGroup>
                    <ControlLabel className="labels">CellPhone:</ControlLabel>
                    <FormControl className="input-textboxes" type="text" value = {this.state.cellPhone} onChange={this.cellPhoneChange}/>
                </FormGroup>
                <FormGroup>
                    <ControlLabel className="labels">SMS:</ControlLabel>
                    <FormControl className="input-textboxes" type="text" value = {this.state.SMS} onChange={this.SMSChange}/>
                </FormGroup>
                <FormGroup>
                    <ControlLabel className="labels">Email:</ControlLabel>
                    <FormControl className="input-textboxes" type="text" value = {this.state.email} onChange={this.emailChange}/>
                </FormGroup>
                {/* <FormGroup>
                    <ControlLabel className="labels">Reportors:</ControlLabel>
                    <FormControl className="input-textboxes" type="text" value = {this.state.children} onChange={this.childrenChange}/>
                </FormGroup> */}
                <FormGroup>
                    <ControlLabel className="labels">Manager:</ControlLabel><br/>
                    <DropdownButton 
                        width="150px"
                        bsStyle="default"
                        title={this.state.manager}
                    >
                    <MenuItem eventKey={null} onSelect={this.managerChange} >----</MenuItem>
                    {
                        this.props.employees.map(employee=>{
                            return <MenuItem  eventKey={employee._id} onSelect={this.managerChange} >{employee.name}</MenuItem>
                        })
                    }
                    </DropdownButton>
                </FormGroup>
                <FormGroup>
                    <ControlLabel className="labels">Start Date:</ControlLabel>
                    <FormControl className="input-textboxes" type="text" value = {this.state.startDate} onChange={this.startDateChange} /><br/>
                </FormGroup>
                <Button className="buttons" onClick ={this.getEmployeeInfo} >Add Employee</Button>  
                {this.props.newEmployeeCompleted && <Redirect to={{pathname: '/', state: {from: this.props.location} }}/>}
            </Form>
        );
    }
}

const mapStateToProps = state => {
    return {
        hasError: state.myEmployeeListR.hasError,
        newEmployeeCompleted: state.myEmployeeListR.newEmployeeCompleted,
        employees: state.myEmployeeListR.employees,
    }
};

function mapDispatchToProps(dispatch) {
    return({
        addOneToServer:(data) =>{ dispatch(actions.addOneToServer(data))},
      })
};

export default connect(mapStateToProps, mapDispatchToProps)(NewEmployee);