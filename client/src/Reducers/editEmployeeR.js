//1 create state
// 1. create state, action, reducer
import thunk from 'redux-thunk';
import {createStore, applyMiddleware} from 'redux';

const initialState ={
    _id: "",picture: "", name:"", title :"",sex:"",officePhone:"", cellPhone:"", SMS:"", email:"",children:"",manager:"", startDate:""
  };
//reducer

export const editEmployeeR =(state = initialState, action)=>{
    switch(action.type){
        case 'SET_PICTURE':
            return {...state, picture: action.text};
        case 'SET_NAME':
            return {...state, name: action.text};
        case 'SET_TITLE':
            return {...state, title: action.text};
        case 'SET_SEX':
            return {...state, sex: action.text};
        case 'SET_OFFICEPHONE':
            return {...state, officePhone: action.text};
        case 'SET_CELLPHONE':
            return {...state, cellPhone: action.text};
        case 'SET_SMS':
            return {...state, SMS: action.text};
        case 'SET_EMAIL':
            return {...state, email: action.text};
        case 'SET_CHILDREN':
            return {...state, sex: action.text};
        case 'SET_MANAGER':
            return {...state, manager: action.text};
        case 'SET_STARTDATE':
            return {...state, startDate: action.text};
        case 'GET_EMPLOYEE_BYID':
            return {...state, 
                picture: action.employee.picture,
                name: action.employee.name, 
                title: action.employee.title,
                sex: action.employee.sex, 
                officePhone: action.employee.officePhone,
                cellPhone: action.employee.cellPhone,
                SMS: action.employee.SMS, 
                email: action.employee.email,
                children: action.employee.children, 
                manager: action.employee.manager,
                startDate: action.employee.startDate
            }
        default:
            return state;
    }
}


export default editEmployeeR;
