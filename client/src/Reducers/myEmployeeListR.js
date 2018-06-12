//1 create state
// 1. create state, action, reducer
import thunk from 'redux-thunk';
import {createStore, applyMiddleware} from 'redux';

const initialState ={
    employees: [],
    children: [],
    withoutoffsprings:[],
    manager:[],
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
            state.employees.forEach(element => {
                arr5.push(element);
            });
            // console.log("sort str:"+action.str)
            if(action.str === "children"){
                arr5.sort((a, b)=> a[action.str].length-b[action.str].length)
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
            return {...state, employees: arr5};
            
        case 'SET_FILTERTEXT':
            return {...state, filterText: action.text};

        case 'GET_CHILDREN':
            return {...state, children: action.data};
        case 'GET_MANAGER':
            return {...state, manager: action.data};
        case 'GET_OFFSPRINGS':
                console.log("hahahah")
                // if(state.employees.filter(em=> String(em._id) == String(action.id))[0].children.length === 0){
                    return {...state, withoutoffsprings: state.employees.filter(x=>String(x._id) != String(action.id))};
                // }else{
                    // console.log("len != 0")
                    // let queue = [...state.employees.filter(em=> String(em._id) == String(action.id))[0].children];
                    // let res = [...queue];
                    // while(queue.length > 0){
                    //     let tmpId = queue.shift();
                    //     res = [...res, ...state.employees.filter(em=>String(em._id) == String(action.id))[0].children];
                    //     queue = [...queue,...state.employees.filter(em=>String(em._id) == String(action.id))[0].children];
                    // }
                    // let tmp = [];
                    // console.log("res:")
                    // console.log(res);
                    // if(res.length > 0){
                    //     res.forEach(element => {
                    //         state.employees.map(item =>{
                    //             if(String(item._id).includes(element) === -1){
                    //                 tmp.push(item);
                    //             }
                    //         })
                    //     })
                    // }
                    // return {...state, withoutoffsprings: []};
                // }
                
        default:
            return state;
    }
}


export default myEmployeeListR;
