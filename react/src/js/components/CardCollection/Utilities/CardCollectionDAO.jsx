/* eslint-disable */
export default class CardCollectionDAO {
    static SORT_BY_NAME = 'name';
    static SORT_BY_POPULAR = 'popular';

    /**
     * Creates an instance of CardCollectionDAO.
     * @param {object} [{
     *         endpoint = '',
     *         pageType = 'collection',
     *         sort = CardCollectionDAO.SORT_BY_POPULAR,
     *         results = 10,
     *         page = 1,
     *     }={}]
     * @memberof CardCollectionDAO
     */
    constructor({
        endpoint = '',
        sort = CardCollectionDAO.SORT_BY_POPULAR,
        activeFilters = [],
        results = 10,
        page = 1,
    } = {}) {
        this.endpoint = endpoint;
        this.activeFilters = activeFilters;
        this.sort = sort;
        this.results = results;
        this.page = page;
    }

    static shuffle(array) {
        let currentIndex = array.length,
            temporaryValue,
            randomIndex;

        // While there remain elements to shuffle...
        while (currentIndex !== 0) {
            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            // And swap it with the current element.
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }

        return array;
    }

    /**
     * Get JSON data from the server with provided parameters
     *
     * @returns {Promise} Promise Object with server json data
     * @memberof CardCollectionDAO
     */
    getData() {
        let fetchStr = `${this.endpoint}.collection.json/sort-${this.sort}/`;
        if (this.activeFilters.length !== 0) {
            const filterStr = this.activeFilters.join('/');
            fetchStr += `${filterStr}/`;
        }
        fetchStr += `results-${this.results}.${this.page}.json`;
        const responsePromise = fetch(fetchStr, { credentials: 'same-origin' })
            .then(response => response.json());
        return responsePromise;
        // const cardCollectionMock = window.cardCollectionMock;
        // CardCollectionDAO.shuffle(cardCollectionMock.cards);
        // return new Promise(((resolve) => {
        //     setTimeout(() => {
        //         resolve(cardCollectionMock);
        //     }, 1000);
        // }));
    }

    /**
     * Set the sort order of the collection.
     * Current valid values are the static values SORT_BY_NAME or SORT_BY_POPULAR
     *
     * @param {string} sort
     * @returns {CardCollectionDAO} <code>this</code>
     * @memberof CardCollectionDAO
     */
    setSort(sort) {
        if (sort === CardCollectionDAO.SORT_BY_NAME ||
            sort === CardCollectionDAO.SORT_BY_POPULAR) {
            this.sort = sort;
        } else {
            // If sort is not a valid value, sort by popular
            this.sort = CardCollectionDAO.SORT_BY_POPULAR;
        }
        return this;
    }

    /**
     * Set the number of results to be returned by the fetch
     *
     * @param {int} results
     * @returns {CardCollectionDAO} <code>this</code>
     * @memberof CardCollectionDAO
     */
    setResults(results) {
        const newResults = parseInt(results, 10);
        if (Number.isNaN(newResults)) {
            this.results = 10;
        } else {
            this.results = results;
        }
        return this;
    }

    /**
     * Set which page of results to fetch
     *
     * @param {int} page
     * @returns {CardCollectionDAO} <code>this</code>
     * @memberof CardCollectionDAO
     */
    setPage(page) {
        const newPage = parseInt(page, 10);
        if (Number.isNaN(newPage)) {
            this.page = 1;
        } else {
            this.page = page;
        }
        return this;
    }

    /**
     * Get the next page of results data
     *
     * @returns {Promise} Promise Object with server json data
     * @memberof CardCollectionDAO
     */
    nextPage() {
        this.page = this.page + 1;
        return this.getData();
    }
}

export const a = 5;
