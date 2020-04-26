/* eslint-disable */

let defaultState = {
    totalResults: 0,
    displayedAssets: 0,
    asset: []
};

function mapCardsToAsset(cards){

    let asset = cards.map((card, index) => {
        const type = card.type === 'standard' ? 'article' : card.type;
        const tag = card.primaryTagId;
        return {
            name: card.article.title,
            position: index,
            type,
            author: card.article.author,
            category: tag.match(/:(.*.)\//)[1],
            url: card.article.url,
        };
    });
    return asset;
}

const cardCollection = (state=defaultState, action) => {

    let newState = Object.assign({}, state);

    switch (action.type){
        case 'SET_TOTAL_RESULTS':
            newState.totalResults = action.totalResults;
            return newState;
        case 'SET_DISPLAYED_CARDS':
            newState.displayedAssets = action.cards.length;
            newState.asset = mapCardsToAsset(action.cards);
            return newState;

        default:
            return state;
    }
};

export default cardCollection;
