//1 create state
// 1. create state, action, reducer
import thunk from 'redux-thunk';
import {createStore, applyMiddleware} from 'redux';

const initialState ={
    employees:[],
    pageEmployees:[],
    offsprings:[],
    hasError: false,
    dataLoading: false,
    editEmployeeCompleted: false,
    newEmployeeCompleted: false,
    deleteEmployeeCompleted: false,
    filterText: '',
  };
  
//reducer
export const myEmployeeListR =(state = initialState, action)=>{
    switch(action.type){   
        case 'GET_ALL':
            return {...state, employees: action.data};   
        case 'DATA_LOADING':
            return {...state, dataLoading: action.val}
        case 'GETDATA_ERROR':
            return {...state, hasError: action.val};
        case 'EDITEMPLOYEE_COMPLETED':
            return {...state, editEmployeeCompleted: action.val};
        case 'NEWEMPLOYEE_COMPLETED':
            return {...state, newEmployeeCompleted: action.val};
        case 'DELETEEMPLOYEE_COMPLETED':
            return {...state, deleteEmployeeCompleted: !state.deleteEmployeeCompleted}
        case 'SET_SORT':
            let arr5 = [];
            state.pageEmployees.forEach(element => {
                arr5.push(element);
            });
            if(action.str === "children"){
                arr5.sort((a, b)=> a[action.str].length-b[action.str].length)
            }
            else{
                arr5.sort(function(a, b) {
                    var nameA = a[action.str]; // ignore upper and lowercase
                    var nameB = b[action.str]; // ignore upper and lowercase
                    if (nameA < nameB) {
                    return -1;
                    }
                    if (nameA > nameB) {
                    return 1;
                    }
                    return 0;
                });
            }
            return {...state, pageEmployees: arr5};
            
        case 'SET_FILTERTEXT':
            return {...state, filterText: action.text};
        case 'GET_OFFSPRINGS':
            let res = [];
            let stack = [];
            res = [...action.employee.children];
            res.push(String(action.employee._id));
            stack=[...action.employee.children];
            while(stack.length > 0){
                let tmp = stack.pop();  
                res.push(...state.employees.find(item=>item._id == tmp).children);
                stack.push(...state.employees.find(item=>item._id == tmp).children);
            }
            return {...state, offsprings: res};   
        case 'SET_PAGEEMPLOYEES':
            return {...state, pageEmployees: action.data};
        default:
            return state;
    }
}


export default myEmployeeListR;
