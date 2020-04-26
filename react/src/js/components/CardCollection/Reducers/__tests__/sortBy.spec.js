import * as sortBy from '../sortBy';

describe('the SortBy reducer', () => {
    describe('open', () => {
        it('toggles the state when given action type TOGGLE', () => {
            let state;

            state = sortBy.open(true, { type: 'TOGGLE' });
            expect(state).toBe(false);

            state = sortBy.open(false, { type: 'TOGGLE' });
            expect(state).toBe(true);
        });
    });

    describe('sortedBy', () => {
        it('sets state to popular when action type is SORT_BY_POPULAR', () => {
            const state = sortBy.sortedBy('something', { type: 'SORT_BY_POPULAR' });
            expect(state).toBe('popular');
        });

        it('sets state to popular when action type is SORT_BY_NAME', () => {
            const state = sortBy.sortedBy('something', { type: 'SORT_BY_NAME' });
            expect(state).toBe('name');
        });
    });
});
