import { combineReducers } from 'redux';
import helpers from './filterGroupsHelpers';

export const filterGroups = (state = [], action) => {
    const newState = state.slice();

    switch (action.type) {
        case 'SET_FILTER_GROUPS':
            return helpers.setFilterGroups(action.tags);
        case 'TOGGLE_FILTER_GROUP':
            return helpers.toggleFilterGroup(newState, action.id);
        case 'OPEN_FILTER_GROUP':
            return helpers.openFilterGroup(newState, action.id);
        case 'CLOSE_FILTER_GROUP':
            return helpers.closeFilterGroup(newState, action.id);
        default:
            return state;
    }
};

export const tags = (state = [], action) => {
    switch (action.type) {
        case 'SET_TAGS':
            return helpers.setTags(action.tags);
        default:
            return state;
    }
};


export const filterItems = (state = [], action) => {
    const newState = state.slice();

    switch (action.type) {
        case 'SET_FILTER_ITEMS':
            return helpers.setFilterItems(action.tags);
        case 'REMOVE_ALL_FILTERS':
            return helpers.removeAllFilters(newState);
        case 'REMOVE_FILTER':
            return helpers.removeFilter(newState, action.id);
        case 'ADD_FILTER':
            return helpers.addFilter(newState, action.id);
        default:
            return state;
    }
};

const filterPanel = combineReducers({
    filterItems, filterGroups, tags,
});

export default filterPanel;
