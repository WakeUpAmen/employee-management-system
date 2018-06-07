
import thunk from 'redux-thunk';
import {createStore, applyMiddleware} from 'redux';

const initialState ={
    filterText: '',
  };
//reducer

export const searchBarR =(state = initialState, action)=>{
    switch(action.type){
        case 'SET_FILTERTEXT':
            return {...state, filterText: action.text};
        default:
            return state;
    }
}


export default searchBarR;
