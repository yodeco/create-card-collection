import { combineReducers } from 'redux';

export const sortedBy = (state = 'name', action) => {
    switch (action.type) {
        case 'SORT_BY_POPULAR':
            return 'popular';
        case 'SORT_BY_NAME':
            return 'name';
        default:
            return state;
    }
};

export const open = (state = false, action) => {
    switch (action.type) {
        case 'TOGGLE':
            return !state;
        default:
            return state;
    }
};


const sortBy = combineReducers({
    sortedBy, open,
});

export default sortBy;
