import * as pagination from '../pagination';
import sinon from 'sinon';

describe('pagination reducers', () => {
    describe('canIncrementPage', () => {
        it('correctly assess whether or not its possible to increment the page', () => {
            expect(pagination.canIncrementPage(1, 2)).toBe(true);
            expect(pagination.canIncrementPage(-1, 2)).toBe(true);
            expect(pagination.canIncrementPage(2, 2)).toBe(false);
            expect(pagination.canIncrementPage(1, -2)).toBe(false);
        });
    });

    describe('canDecrementPage', () => {
        it('correctly assess whether or not its possible to increment the page', () => {
            expect(pagination.canDecrementPage(1)).toBe(false);
            expect(pagination.canDecrementPage(4)).toBe(true);
            expect(pagination.canDecrementPage(-4)).toBe(false);
            expect(pagination.canDecrementPage(900)).toBe(true);
        });
    });

    describe('canChangeToPage', () => {
        it('correctly assess whether or not its possible to change to the page', () => {
            expect(pagination.canChangeToPage(-5, 100)).toBe(false);
            expect(pagination.canChangeToPage(5, 100)).toBe(true);
            expect(pagination.canChangeToPage(10, 5)).toBe(false);
            expect(pagination.canChangeToPage(1, 10000)).toBe(true);
        });
    });

    describe('pagination', () => {
        describe('increment page', () => {
            it('increments the page when the params are normal', () => {
                const state = pagination.pagination({ currentPage: 1, numberOfPages: 5 }, { type: 'INCREMENT_PAGE' });
                expect(state.currentPage).toBe(2);
            });

            it('does not increment the page when page is at max page', () => {
                const state = pagination.pagination({ currentPage: 5, numberOfPages: 5 }, { type: 'INCREMENT_PAGE' });
                expect(state.currentPage).toBe(5);
            });

            it('does not increment the page when page is above max page', () => {
                const state = pagination.pagination({ currentPage: 9, numberOfPages: 5 }, { type: 'INCREMENT_PAGE' });
                expect(state.currentPage).toBe(9);
            });
        });

        describe('decrement page', () => {
            it('decrements the page when the params are normal', () => {
                const state = pagination.pagination({ currentPage: 5, numberOfPages: 5 }, { type: 'DECREMENT_PAGE' });
                expect(state.currentPage).toBe(4);
            });

            it('does not decrement the page when page is at 1', () => {
                const state = pagination.pagination({ currentPage: 1, numberOfPages: 5 }, { type: 'DECREMENT_PAGE' });
                expect(state.currentPage).toBe(1);
            });

            it('does not decrement the page when page is below 1', () => {
                const state = pagination.pagination({ currentPage: -2, numberOfPages: 5 }, { type: 'DECREMENT_PAGE' });
                expect(state.currentPage).toBe(-2);
            });
        });

        describe('GO_TO_FIRST_PAGE', () => {
            it('changes to the first page', () => {
                const state = pagination.pagination({ currentPage: 134234, numberOfPages: 5 }, { type: 'GO_TO_FIRST_PAGE' });
                expect(state.currentPage).toBe(1);
            });

            it('does not care what the number of pagees value is', () => {
                const state = pagination.pagination({ currentPage: 1, numberOfPages: 'i love unittests' }, { type: 'GO_TO_FIRST_PAGE' });
                expect(state.currentPage).toBe(1);
            });
        });

        describe('GO_TO_LAST_PAGE', () => {
            it('changes to the last page', () => {
                const state = pagination.pagination({ currentPage: 134234, numberOfPages: 9999 }, { type: 'GO_TO_LAST_PAGE' });
                expect(state.currentPage).toBe(9999);
            });

            it('does not care what the current page value is', () => {
                const state = pagination.pagination({ currentPage: 'i love unittests', numberOfPages: 9999 }, { type: 'GO_TO_LAST_PAGE' });
                expect(state.currentPage).toBe(9999);
            });
        });

        describe('SET_CURRENT_PAGE', () => {
            it('changes to that page if conditions are normal', () => {
                const state = pagination.pagination({ currentPage: 2, numberOfPages: 9999 }, { type: 'SET_CURRENT_PAGE', currentPage: 5 });
                expect(state.currentPage).toBe(5);
            });

            it('does not do anything if it is not possible to change to that page', () => {
                const state = pagination.pagination({ currentPage: 2, numberOfPages: 100 }, { type: 'SET_CURRENT_PAGE', currentPage: 500 });
                expect(state.currentPage).toBe(2);
            });
        });

        describe('SET_NUMBER_OF_PAGES', () => {
            it('changes the number of pages', () => {
                const state = pagination.pagination({ currentPage: 2, numberOfPages: 9999 }, { type: 'SET_NUMBER_OF_PAGES', numberOfPages: 1337 });
                expect(state.numberOfPages).toBe(1337);
            });
        });
    });
});
