import * as actions from '../index';
import * as types from '../../Constants/ActionTypes';

describe('the action creators', () => {
    describe('togglePopup', () => {
        it('returns an action with the type TOGGLE', () => {
            expect(actions.togglePopup()).toEqual({ type: types.TOGGLE });
        });
    });

    describe('setPopularSelected', () => {
        it('returns an action with the type SORT_BY_POPULAR', () => {
            expect(actions.setPopularSelected()).toEqual({ type: types.SORT_BY_POPULAR });
        });
    });

    describe('setNameSelected', () => {
        it('returns an action with the type SORT_BY_NAME', () => {
            expect(actions.setNameSelected()).toEqual({ type: types.SORT_BY_NAME });
        });
    });

    describe('incrementPageIndex', () => {
        it('returns an action with the type INCREMENT_PAGE', () => {
            expect(actions.incrementPageIndex()).toEqual({ type: 'INCREMENT_PAGE' });
        });
    });

    describe('decrementPageIndex', () => {
        it('returns an action with the type DECREMENT_PAGE', () => {
            expect(actions.decrementPageIndex()).toEqual({ type: 'DECREMENT_PAGE' });
        });
    });

    describe('setPageIndexAsFirst', () => {
        it('returns an action with the type GO_TO_FIRST_PAGE', () => {
            expect(actions.setPageIndexAsFirst()).toEqual({ type: 'GO_TO_FIRST_PAGE' });
        });
    });

    describe('setPageIndexAsLast', () => {
        it('returns an action with the type GO_TO_LAST_PAGE', () => {
            expect(actions.setPageIndexAsLast()).toEqual({ type: 'GO_TO_LAST_PAGE' });
        });
    });

    describe('setPageIndex', () => {
        it('returns an action with the type SET_CURRENT_PAGE', () => {
            expect(actions.setPageIndex()).toEqual({ type: 'SET_CURRENT_PAGE' });
        });
    });

    describe('setNumberOfPages', () => {
        it('returns an action with the type SET_NUMBER_OF_PAGES and the pages first argument as the payload: numberofPages', () => {
            const pages = 5;
            expect(actions.setNumberOfPages(pages)).toEqual({
                type: 'SET_NUMBER_OF_PAGES',
                numberOfPages: pages,
            });
        });
    });

    describe('setFilterItems', () => {
        it('returns an action with the type SET_FILTER_ITEMS and the pages first argument as the payload: tags', () => {
            const tags = ['anyvalue'];
            expect(actions.setFilterItems(tags)).toEqual({
                type: 'SET_FILTER_ITEMS',
                tags,
            });
        });
    });

    describe('setFilterGroups', () => {
        it('returns an action with the type SET_FILTER_GROUPS and the pages first argument as the payload: tags', () => {
            const tags = ['anyvalue'];
            expect(actions.setFilterGroups(tags)).toEqual({
                type: 'SET_FILTER_GROUPS',
                tags,
            });
        });
    });

    describe('setTags', () => {
        it('returns an action with the type SET_TAGS and the pages first argument as the payload: tags', () => {
            const tags = ['anyvalue'];
            expect(actions.setTags(tags)).toEqual({
                type: 'SET_TAGS',
                tags,
            });
        });
    });

    describe('clearActiveFilters', () => {
        it('returns an action with the type REMOVE_ALL_FILTERS', () => {
            expect(actions.clearActiveFilters()).toEqual({ type: 'REMOVE_ALL_FILTERS' });
        });
    });

    describe('addFilter', () => {
        it('returns an action with the type ADD_FILTER and the pages first argument as the payload: id', () => {
            const id = 5;
            expect(actions.addFilter(id)).toEqual({
                type: 'ADD_FILTER',
                id,
            });
        });
    });

    describe('removeFilter', () => {
        it('returns an action with the type REMOVE_FILTER and the pages first argument as the payload: id', () => {
            const id = 5;
            expect(actions.removeFilter(id)).toEqual({
                type: 'REMOVE_FILTER',
                id,
            });
        });
    });

    describe('toggleGroup', () => {
        it('returns an action with the type TOGGLE_FILTER_GROUP and the pages first argument as the payload: id', () => {
            const id = 5;
            expect(actions.toggleGroup(id)).toEqual({
                type: 'TOGGLE_FILTER_GROUP',
                id,
            });
        });
    });

    describe('openFilterGroup', () => {
        it('returns an action with the type OPEN_FILTER_GROUP and the pages first argument as the payload: id', () => {
            const id = 5;
            expect(actions.openFilterGroup(id)).toEqual({
                type: 'OPEN_FILTER_GROUP',
                id,
            });
        });
    });

    describe('closeFilterGroup', () => {
        it('returns an action with the type CLOSE_FILTER_GROUP and the pages first argument as the payload: id', () => {
            const id = 5;
            expect(actions.closeFilterGroup(id)).toEqual({
                type: 'CLOSE_FILTER_GROUP',
                id,
            });
        });
    });
});
