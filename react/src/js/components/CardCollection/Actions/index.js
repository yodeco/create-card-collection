import * as types from '../Constants/ActionTypes';

/**
 * Card Collection
 * * */

export const setTotalResults = totalResults => ({
    type: 'SET_TOTAL_RESULTS',
    totalResults,
});

export const setDisplayedAssets = cards => ({
    type: 'SET_DISPLAYED_CARDS',
    cards,
});

/**
 * Popup Actions
 * * */

export const togglePopup = () => ({
    type: types.TOGGLE,
});

export const setPopularSelected = () => ({
    type: types.SORT_BY_POPULAR,
});

export const setNameSelected = () => ({
    type: types.SORT_BY_NAME,
});

/**
 * Pagination Actions
 * * */

export const incrementPageIndex = () => ({
    type: 'INCREMENT_PAGE',
});

export const decrementPageIndex = () => ({
    type: 'DECREMENT_PAGE',
});

export const setPageIndexAsFirst = () => ({
    type: 'GO_TO_FIRST_PAGE',
});

export const setPageIndexAsLast = () => ({
    type: 'GO_TO_LAST_PAGE',
});

export const setPageIndex = page => ({
    type: 'SET_CURRENT_PAGE',
    currentPage: page,
});

export const setNumberOfPages = pages => ({
    type: 'SET_NUMBER_OF_PAGES',
    numberOfPages: pages,
});

/**
 * Filter Panel Actions
 * * */

export const setFilterItems = tags => ({
    type: 'SET_FILTER_ITEMS',
    tags,
});

export const setFilterGroups = tags => ({
    type: 'SET_FILTER_GROUPS',
    tags,
});

export const setTags = tags => ({
    type: 'SET_TAGS',
    tags,
});

export const clearActiveFilters = () => ({
    type: 'REMOVE_ALL_FILTERS',
});

export const addFilter = id => ({
    type: 'ADD_FILTER',
    id,
});

export const removeFilter = id => ({
    type: 'REMOVE_FILTER',
    id,
});

export const toggleGroup = id => ({
    type: 'TOGGLE_FILTER_GROUP',
    id,
});

export const openFilterGroup = id => ({
    type: 'OPEN_FILTER_GROUP',
    id,
});

export const closeFilterGroup = id => ({
    type: 'CLOSE_FILTER_GROUP',
    id,
});

export const sendAnalytics = (eventName, eventType) => ({
    type: 'SEND_ANALYTICS',
    eventName,
    eventType,
});
