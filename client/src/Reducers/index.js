import { combineReducers } from "redux";
import myEmployeeListR from "./myEmployeeListR";
import editEmployeeR from "./editEmployeeR";
// import searchBarR from "./searchBarR";

const reducers = combineReducers({
    myEmployeeListR,
    editEmployeeR,
    // searchBarR
});

export default reducers;