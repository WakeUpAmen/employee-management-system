import axios from 'axios';
//async functions
export function getAllEmployeesFromServer() {
    return (dispatch) => {
        dispatch(dataLoading(true));
        axios.get("http://localhost:8888/api/employees/")
        .then(response => {
            console.log("get all employees:")
            console.log(response.data)
            dispatch(getAll(response.data));
            dispatch(dataLoading(false));
        })
        .catch(err => {
            dispatch(getDataError(true));
            dispatch(dataLoading(false));
        });
    }
}

export function getEmployeeByIdFromServer(id) {
    return (dispatch) => {
        dispatch(dataLoading(true));
        axios.get("http://localhost:8888/api/employees/"+id, {
            id: id
        })
        .then((response) => {
            dispatch(getEmployeeById(response.data.employee));
            dispatch(getChildren(response.data.children));
            dispatch(getmanager(response.data.manager))
            dispatch(dataLoading(false));
        })
        .catch(err => {
            dispatch(getDataError(true));
            dispatch(dataLoading(false));
        });
    }
}

export function addOneToServer(emlpoyeeDate) {
    return (dispatch) => {
        dispatch(dataLoading(true));
        axios.post("http://localhost:8888/api/employees/", {
            employee: emlpoyeeDate
        })
        .then((response) => {
            console.log(" add ok")
            dispatch(newEmployeeCompleted(true));
            dispatch(dataLoading(false));
        })
        .catch(err => {
            console.log("add bad")
            dispatch(getDataError(true));
            dispatch(dataLoading(false));
        });
    }
}

export function updateOneToServer(id, emlpoyeeDate) {
    return (dispatch) => {
        dispatch(dataLoading(true));
        axios.put("http://localhost:8888/api/employees/"+id, {
            employee: emlpoyeeDate
        })
        .then((response) => {
            console.log(response.data);
            dispatch(editEmployeeCompleted(true));
            dispatch(dataLoading(false));
        })
        .catch(err => {
            dispatch(getDataError(true));
            dispatch(dataLoading(false));
        });
    }
}

export function deleteOneFromServer(id) {
    console.log(id);
    return (dispatch) => {
        dispatch(dataLoading(true));
        axios.delete("http://localhost:8888/api/employees/"+id, {
            id:id,
        })
        .then((response) => {
            console.log("delete okokok")
            console.log(response.data);
            // dispatch(deleteEmployeeCompleted());
            dispatch(dataLoading(false));
        })
        .catch(err => {
            dispatch(getDataError(true));
            dispatch(dataLoading(false));
        });
    }
}
// actions
export const setSort ={
    type: 'SET_SORT',  
    str:""
};
export const setFilterText =text=>({
    type: 'SET_FILTERTEXT', 
    text
});
// export const setPage=page=>({
//     type: 'SET_PAGE', 
//     page
// });
export const getEmployeeById = employee =>({
    type: 'GET_EMPLOYEE_BYID',
    employee
})
export const setPicture= (text) =>({
    type: 'SET_PICTURE',
    text
})
export const setName= (text) =>({
    type: 'SET_NAME',
    text
})
export const setTitle= (text) =>({
    type: 'SET_TITLE',
    text
})
export const setSex= (text) =>({
    type: 'SET_SEX',
    text
})
export const setOfficePhone= (text) =>({
    type: 'SET_OFFICEPHONE',
    text
})
export const setCellPhone= (text) =>({
    type: 'SET_CELLPHONE',
    text
})
export const setSMS= (text) =>({
    type: 'SET_SMS',
    text
})
export const setEmail= (text) =>({
    type: 'SET_EMAIL',
    text
})
export const setChildren= (text) =>({
    type: 'SET_CHILDREN',
    text
})
export const setManager= (text) =>({
    type: 'SET_MANAGER',
    text
})
export const setStartDate= (text) =>({
    type: 'SET_STARTDATE',
    text
})

export const pageIncrement={
    type: 'PAGE_INCREMENT'
};
export const pageDecrement={
    type: 'PAGE_DECREMENT'
};

export const getAll = data => ({
    type: 'GET_ALL', 
    data
});

export const getDataError = val=>({
    type: 'GETDATA_ERROR',
    val
})

export const dataLoading =val=>({
    type: 'DATA_LOADING',
    val
})
export const editEmployeeCompleted =val=>({
    type: 'EDITEMPLOYEE_COMPLETED',
    val
})

export const newEmployeeCompleted =val=>({
    type: 'NEWEMPLOYEE_COMPLETED',
    val
})

export const deleteEmployeeCompleted =() =>({
    type: 'DELETEEMPLOYEE_COMPLETED',
})

export const deleteEmployee =index =>({
    type: 'DELETE_EMPLOYEE',
    index,
})

export const getPageEmployees=(page)=>({
    type: 'GET_EMPLOYEES',
    page
})
export const getChildren=(data)=>({
    type: 'GET_CHILDREN',
    data
})

export const getmanager =(data)=>({
    type: 'GET_MANAGER',
    data
})