import sinon from 'sinon';
import * as filterPanel from '../filterPanel';
import * as helpers from '../filterGroupsHelpers';

describe('filterPanel reducers', () => {
    describe('getNameId', () => {
        it('transforms the input to lowercase', () => {
            const testInputs = [
                'CAPSTEXT',
                'MixedCaseText',
                'lowercasetext',
            ];

            testInputs.forEach((input) => {
                expect(helpers.getNameId(input)).toEqual(input.toLowerCase());
            });
        });

        it('removes whitespace', () => {
            const testInputs = [
                'a b c',
                'a   b    c',
                'a - b _ c',
            ];

            const results = [
                'abc',
                'abc',
                'a-b_c',
            ];

            testInputs.forEach((input, i) => {
                expect(helpers.getNameId(input)).toEqual(results[i]);
            });
        });
    });

    describe('getParentId', () => {
        let spy;

        beforeEach(() => {
            spy = sinon.spy(helpers, 'getNameId');
        });

        afterEach(() => {
            spy.restore();
        });

        it('calls getNameId with the title parameter', () => {
            helpers.getParentId('something');
            expect(spy.calledOnce).toBe(true);
        });

        it('appends the text tag-List_Group- to the result of getNameId', () => {
            const result = helpers.getParentId('something');
            expect(result).toEqual('tag-List_Group-something');
        });
    });

    describe('setFilterItems', () => {
        it('produces the correct output', () => {
            const input = {
                group1: {
                    tags: {
                        sometag: {
                            title: 'title1',
                            id: 1,
                            index: 1,
                        },
                        othertag: {
                            title: 'title2',
                            id: 2,
                            index: 2,
                        },
                    },
                    title: 'group1',
                },
                group2: {
                    tags: {
                        thistag: {
                            title: 'title3',
                            id: 3,
                            index: 3,
                        },
                        thattag: {
                            title: 'title4',
                            id: 4,
                            index: 4,
                        },
                    },
                    title: 'group2',
                },
            };

            expect(helpers.setFilterItems(input)).toEqual([
                {
                    title: 'title1',
                    id: 1,
                    checked: false,
                    category: 'group1',
                    index: 0,
                    parentId: helpers.getParentId('group1'),
                },
                {
                    title: 'title2',
                    id: 2,
                    checked: false,
                    category: 'group1',
                    index: 1,
                    parentId: helpers.getParentId('group1'),
                },
                {
                    title: 'title3',
                    id: 3,
                    checked: false,
                    category: 'group2',
                    index: 2,
                    parentId: helpers.getParentId('group2'),
                },
                {
                    title: 'title4',
                    id: 4,
                    checked: false,
                    category: 'group2',
                    index: 3,
                    parentId: helpers.getParentId('group2'),
                },
            ]);
        });
    });

    describe('setFilterGroups', () => {
        it('returns the correct result', () => {
            const input = {
                group1: {
                    title: 'group1',
                    id: 1,
                },
                group2: {
                    title: 'group2',
                    id: 2,
                },
            };

            expect(helpers.setFilterGroups(input)).toEqual([
                {
                    category: 'group1',
                    id: 1,
                    isOpen: false,
                },
                {
                    category: 'group2',
                    id: 2,
                    isOpen: false,
                },
            ]);
        });
    });

    describe('toggleFilterGroup', () => {
        it('returns the correct result', () => {
            const input = [
                {
                    category: 'group1',
                    id: 0,
                    isOpen: false,
                },
                {
                    category: 'group2',
                    id: 1,
                    isOpen: true,
                },
            ];

            const result = helpers.toggleFilterGroup(input, 1);
            expect(result).toEqual([
                {
                    category: 'group1',
                    id: 0,
                    isOpen: false,
                },
                {
                    category: 'group2',
                    id: 1,
                    isOpen: false,
                },
            ]);

            expect(helpers.toggleFilterGroup(result, 1)).toEqual(input);
        });
    });

    describe('openFilterGroup', () => {
        it('returns the correct result', () => {
            const input = [
                {
                    category: 'group1',
                    id: 0,
                    isOpen: false,
                },
                {
                    category: 'group2',
                    id: 1,
                    isOpen: false,
                },
            ];

            expect(helpers.openFilterGroup(input, 1)).toEqual([
                {
                    category: 'group1',
                    id: 0,
                    isOpen: false,
                },
                {
                    category: 'group2',
                    id: 1,
                    isOpen: true,
                },
            ]);
        });
    });

    describe('closeFilterGroup', () => {
        it('returns the correct result', () => {
            const input = [
                {
                    category: 'group1',
                    id: 0,
                    isOpen: false,
                },
                {
                    category: 'group2',
                    id: 1,
                    isOpen: true,
                },
            ];

            expect(helpers.closeFilterGroup(input, 1)).toEqual([
                {
                    category: 'group1',
                    id: 0,
                    isOpen: false,
                },
                {
                    category: 'group2',
                    id: 1,
                    isOpen: false,
                },
            ]);
        });
    });

    describe('removeFilter', () => {
        it('correctly unchecks the filter', () => {
            const input = [
                {
                    title: 'title1',
                    id: 1,
                    checked: false,
                    category: 'group1',
                    index: 0,
                    parentId: helpers.getParentId('group1'),
                },
                {
                    title: 'title2',
                    id: 2,
                    checked: true,
                    category: 'group1',
                    index: 1,
                    parentId: helpers.getParentId('group1'),
                },
            ];

            expect(helpers.removeFilter(input, 2)).toEqual([
                {
                    title: 'title1',
                    id: 1,
                    checked: false,
                    category: 'group1',
                    index: 0,
                    parentId: helpers.getParentId('group1'),
                },
                {
                    title: 'title2',
                    id: 2,
                    checked: false,
                    category: 'group1',
                    index: 1,
                    parentId: helpers.getParentId('group1'),
                },
            ]);
        });
    });

    describe('removeAllFilters', () => {
        it('correctly unchecks all the filters', () => {
            const input = [
                {
                    title: 'title1',
                    id: 1,
                    checked: true,
                    category: 'group1',
                    index: 0,
                    parentId: helpers.getParentId('group1'),
                },
                {
                    title: 'title2',
                    id: 2,
                    checked: true,
                    category: 'group1',
                    index: 1,
                    parentId: helpers.getParentId('group1'),
                },
            ];

            expect(helpers.removeAllFilters(input)).toEqual([
                {
                    title: 'title1',
                    id: 1,
                    checked: false,
                    category: 'group1',
                    index: 0,
                    parentId: helpers.getParentId('group1'),
                },
                {
                    title: 'title2',
                    id: 2,
                    checked: false,
                    category: 'group1',
                    index: 1,
                    parentId: helpers.getParentId('group1'),
                },
            ]);
        });
    });

    describe('addFilter', () => {
        it('correctly checks the filter', () => {
            const input = [
                {
                    title: 'title1',
                    id: 1,
                    checked: false,
                    category: 'group1',
                    index: 0,
                    parentId: helpers.getParentId('group1'),
                },
                {
                    title: 'title2',
                    id: 2,
                    checked: false,
                    category: 'group1',
                    index: 1,
                    parentId: helpers.getParentId('group1'),
                },
            ];

            expect(helpers.addFilter(input, 2)).toEqual([
                {
                    title: 'title1',
                    id: 1,
                    checked: false,
                    category: 'group1',
                    index: 0,
                    parentId: helpers.getParentId('group1'),
                },
                {
                    title: 'title2',
                    id: 2,
                    checked: true,
                    category: 'group1',
                    index: 1,
                    parentId: helpers.getParentId('group1'),
                },
            ]);
        });
    });

    describe('setTags', () => {
        it('returns its argument', () => {
            expect(helpers.setTags(2)).toBe(2);
        });
    });

    describe('filterItems', () => {
        beforeEach(() => {
            sinon.spy(helpers, 'setFilterItems');
            sinon.spy(helpers, 'removeAllFilters');
            sinon.spy(helpers, 'removeFilter');
            sinon.spy(helpers, 'addFilter');
        });

        afterEach(() => {
            helpers.setFilterItems.restore();
            helpers.removeAllFilters.restore();
            helpers.removeFilter.restore();
            helpers.addFilter.restore();
        });

        it('calls setFilterItems on setFilterGroups action type SET_FILTER_ITEMS', () => {
            filterPanel.filterItems([], { type: 'SET_FILTER_ITEMS', tags: {} });
            expect(helpers.setFilterItems.calledOnce).toBe(true);
        });

        it('calls removeAllFilters on action type REMOVE_ALL_FILTERS', () => {
            filterPanel.filterItems([], { type: 'REMOVE_ALL_FILTERS' });
            expect(helpers.removeAllFilters.calledOnce).toBe(true);
        });

        it('calls removeFilter on action type REMOVE_FILTER', () => {
            filterPanel.filterItems([], { type: 'REMOVE_FILTER' });
            expect(helpers.removeFilter.calledOnce).toBe(true);
        });

        it('calls addFilter on action type ADD_FILTER', () => {
            filterPanel.filterItems([], { type: 'ADD_FILTER' });
            expect(helpers.addFilter.calledOnce).toBe(true);
        });
    });

    describe('filterGroups', () => {
        beforeEach(() => {
            sinon.spy(helpers, 'setFilterGroups');
            sinon.spy(helpers, 'toggleFilterGroup');
            sinon.spy(helpers, 'openFilterGroup');
            sinon.spy(helpers, 'closeFilterGroup');
        });

        afterEach(() => {
            helpers.setFilterGroups.restore();
            helpers.toggleFilterGroup.restore();
            helpers.openFilterGroup.restore();
            helpers.closeFilterGroup.restore();
        });

        it('calls setFilterGroups on action type SET_FILTER_GROUPS', () => {
            filterPanel.filterGroups([], { type: 'SET_FILTER_GROUPS', tags: {} });
            expect(helpers.setFilterGroups.calledOnce).toBe(true);
        });

        it('calls toggleFilterGroup on action type TOGGLE_FILTER_GROUP', () => {
            filterPanel.filterGroups([{
                category: 'group1',
                id: 0,
                isOpen: false,
            }], { type: 'TOGGLE_FILTER_GROUP', id: 0 });
            expect(helpers.toggleFilterGroup.calledOnce).toBe(true);
        });

        it('calls openFilterGroup on action type OPEN_FILTER_GROUP', () => {
            filterPanel.filterGroups([{
                category: 'group1',
                id: 0,
                isOpen: false,
            }], { type: 'OPEN_FILTER_GROUP', id: 0 });
            expect(helpers.openFilterGroup.calledOnce).toBe(true);
        });

        it('calls closeFilterGroup on action type CLOSE_FILTER_GROUP', () => {
            filterPanel.filterGroups([{
                category: 'group1',
                id: 0,
                isOpen: false,
            }], { type: 'CLOSE_FILTER_GROUP', id: 0 });
            expect(helpers.closeFilterGroup.calledOnce).toBe(true);
        });
    });

    describe('tags', () => {
        it('calls setTags on action type SET_TAGS', () => {
            sinon.spy(helpers, 'setTags');
            filterPanel.tags([], { type: 'SET_TAGS', tags: null });
            expect(helpers.setTags.calledOnce).toBe(true);
            helpers.setTags.restore();
        });
    });
});
