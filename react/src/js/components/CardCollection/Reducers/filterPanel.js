import { combineReducers } from 'redux';

/**
 *  Utility method to get parent div id.
 */

export function getNameId(title) {
    return title.replace(/\s/g, '').toLowerCase();
}

export function getParentId(title) {
    return `tag-List_Group-${exports.getNameId(title)}`;
}

/**
 * Instead of using nested hierarchy for tags, and trying to build and manage the filter
 * panel that way, flattening this data structure makes it incredibly easy to maintain
 * and update the state of the filter Panel using reducers.
 *
 * @param tagGroups
 */

export function setFilterItems(tagGroups) {
    const returnValue = [];
    let counter = 0;
    Object.keys(tagGroups).forEach((keyName) => {
        const { tags } = tagGroups[keyName];

        Object.keys(tags).forEach((tag) => {
            const obj = {};
            obj.title = tags[tag].title;
            obj.id = tags[tag].id;
            obj.checked = false;
            obj.category = tagGroups[keyName].title;
            obj.index = counter;

            obj.parentId = exports.getParentId(obj.category);

            returnValue.push(obj);
            counter += 1;
        });
    });
    return returnValue;
}

export function setFilterGroups(tagGroups) {
    const returnValue = [];
    Object.keys(tagGroups).forEach((keyName) => {
        const obj = {};
        obj.category = tagGroups[keyName].title;
        obj.id = tagGroups[keyName].id;
        obj.isOpen = false;
        returnValue.push(obj);
    });
    return returnValue;
}

export function toggleFilterGroup(allFilterGroups, id) {
    const newState = allFilterGroups.map((item, index) => {
        if (index === id) {
            let rObj = {};
            rObj = item;
            rObj.isOpen = !rObj.isOpen;
            return rObj;
        }
        return item;
    });

    return newState;
}

export function openFilterGroup(allFilterGroups, id) {
    const newState = allFilterGroups.map((item, index) => {
        if (index === id) {
            let rObj = {};
            rObj = item;
            rObj.isOpen = true;
            return rObj;
        }
        return item;
    });

    return newState;
}

export function closeFilterGroup(allFilterGroups, id) {
    const newState = allFilterGroups.map((item, index) => {
        if (index === id) {
            let rObj = {};
            rObj = item;
            rObj.isOpen = false;
            return rObj;
        }
        return item;
    });

    return newState;
}

/**
 *  Manage state based off this flattened tag group structure
 * */

export function removeFilter(allFilterItems, id) {
    const newState = allFilterItems.map((item) => {
        if (item.id === id) {
            let rObj = {};
            rObj = item;
            rObj.checked = false;
            return rObj;
        }
        return item;
    });

    return newState;
}

export function removeAllFilters(allFilterItems) {
    const newState = allFilterItems.map((item) => {
        let rObj = {};
        rObj = item;
        rObj.checked = false;
        return rObj;
    });

    return newState;
}

export function addFilter(allFilterItems, id) {
    const newState = allFilterItems.map((item) => {
        if (item.id === id) {
            let rObj = {};
            rObj = item;
            rObj.checked = true;
            return rObj;
        }
        return item;
    });

    return newState;
}

export const filterItems = (state = [], action) => {
    const newState = state.slice();

    switch (action.type) {
        case 'SET_FILTER_ITEMS':
            return exports.setFilterItems(action.tags);
        case 'REMOVE_ALL_FILTERS':
            return exports.removeAllFilters(newState);
        case 'REMOVE_FILTER':
            return exports.removeFilter(newState, action.id);
        case 'ADD_FILTER':
            return exports.addFilter(newState, action.id);
        default:
            return state;
    }
};

export const filterGroups = (state = [], action) => {
    const newState = state.slice();

    switch (action.type) {
        case 'SET_FILTER_GROUPS':
            return exports.setFilterGroups(action.tags);
        case 'TOGGLE_FILTER_GROUP':
            return exports.toggleFilterGroup(newState, action.id);
        case 'OPEN_FILTER_GROUP':
            return exports.openFilterGroup(newState, action.id);
        case 'CLOSE_FILTER_GROUP':
            return exports.closeFilterGroup(newState, action.id);
        default:
            return state;
    }
};

export function setTags(tags) {
    return tags;
}

export const tags = (state = [], action) => {
    switch (action.type) {
        case 'SET_TAGS':
            return exports.setTags(action.tags);
        default:
            return state;
    }
};


const filterPanel = combineReducers({
    filterItems, filterGroups, tags,
});

export default filterPanel;
