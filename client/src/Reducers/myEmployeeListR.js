//1 create state
// 1. create state, action, reducer
import thunk from 'redux-thunk';
import {createStore, applyMiddleware} from 'redux';

const initialState ={
    employees: [],
    children: [],
    manager:[],
    filteredEmployees: [],
    pageEmployees: [],
    page: 1,
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
            return {...state, employees: action.data, filteredEmployees: action.data, pageEmployees: action.data.slice(0, 5)};
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
            state.filteredEmployees.forEach(element => {
                arr5.push(element);
            });
            if(action.str === "age"){
                arr5.sort((a, b)=> a[action.str]-b[action.str])
            }else{
                arr5.sort(function(a, b) {
                    var nameA = a[action.str].toUpperCase(); // ignore upper and lowercase
                    var nameB = b[action.str].toUpperCase(); // ignore upper and lowercase
                    if (nameA < nameB) {
                    return -1;
                    }
                    if (nameA > nameB) {
                    return 1;
                    }
                    return 0;
                });
            }
            return {...state, filteredEmployees: arr5};
        // case 'SET_PAGE':
        //     return {...state, page: action.page};
            
        case 'PAGE_INCREMENT':
            if(state.page >= state.filteredEmployees.length / 5){
                return state;
            }
            return {...state, page: state.page + 1, pageEmployees: state.filteredEmployees.slice((state.page) * 5, (state.page) * 5+5)};
        case 'PAGE_DECREMENT':
            if(state.page === 1){
                return state;
            }
            return {...state, page: state.page - 1, pageEmployees: state.filteredEmployees.slice((state.page - 2) * 5, (state.page - 2) * 5+5)};
        case 'SET_FILTERTEXT':
            return {...state, filterText: action.text, filteredEmployees: state.employees.filter(employee=>employee.name.indexOf(action.text) !== -1), pageEmployees: state.filteredEmployees.slice((state.page -1) * 5, (state.page-1) * 5+5)};
        // case 'GET_PAGEEMPLOYEES':
        //     return {...state, page:action.page, pageEmployees: state.filteredEmployees.slice((action.page -1) * 5, (action.page-1) * 5+5)}
        case 'GET_CHILDREN':
            return {...state, children: action.data};
        case 'GET_MANAGER':
            return {...state, manager: action.data};
        default:
            return state;
    }
}


export default myEmployeeListR;
