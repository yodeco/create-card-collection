import { combineReducers } from 'redux';
import sortBy from '../Reducers/sortBy';
import paginationReducer from '../Reducers/pagination';
import filterPanel from '../Reducers/filterPanel';

const reducer = combineReducers({
    sortBy, pagination: paginationReducer, filterPanel,
});

export default reducer;
