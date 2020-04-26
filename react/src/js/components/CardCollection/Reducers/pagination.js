export function canIncrementPage(pageNumber, numberOfPages) {
    return (pageNumber < numberOfPages);
}

export function canDecrementPage(pageNumber) {
    return (pageNumber > 1);
}

export function canChangeToPage(pageNumber, numberOfPages) {
    return (pageNumber >= 1 && pageNumber <= numberOfPages);
}

const defaultState = {
    currentPage: 1,
    numberOfPages: 1,
};

export const pagination = (state = defaultState, action) => {
    const newState = Object.assign({}, state);

    switch (action.type) {
        case 'INCREMENT_PAGE':
            if (exports.canIncrementPage(state.currentPage, state.numberOfPages)) {
                newState.currentPage = state.currentPage + 1;
                return newState;
            }
            return state;


        case 'DECREMENT_PAGE':
            if (exports.canDecrementPage(state.currentPage, state.numberOfPages)) {
                newState.currentPage = state.currentPage - 1;
                return newState;
            }
            return state;


        case 'GO_TO_FIRST_PAGE':
            newState.currentPage = 1;
            return newState;

        case 'GO_TO_LAST_PAGE':
            newState.currentPage = state.numberOfPages;
            return newState;

        case 'SET_CURRENT_PAGE':
            if (exports.canChangeToPage(action.currentPage, state.numberOfPages)) {
                newState.currentPage = action.currentPage;
                return newState;
            }
            return state;


        case 'SET_NUMBER_OF_PAGES':
            newState.numberOfPages = action.numberOfPages;
            return newState;

        default:
            return state;
    }
};

export default pagination;
