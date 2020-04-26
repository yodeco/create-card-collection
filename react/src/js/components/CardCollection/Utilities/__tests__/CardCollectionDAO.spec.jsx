import 'isomorphic-fetch';
import CardCollectionDAO from './../CardCollectionDAO';

const mockResponse = (status, statusText, response) => new window.Response(response, {
    status,
    statusText,
    headers: {
        'Content-type': 'application/json',
    },
});

describe('Card Collection DAO', () => {
    it('correctly fetches the result using minimal parameters when getting data', () => {
        window.fetch = jest.fn().mockImplementation(() => Promise.resolve(mockResponse(200, null, '{}')));

        const dao = new CardCollectionDAO();
        const dataPromise = dao.getData();

        dataPromise
            .then(json => expect(json).toEqual({}))
            .catch((err) => { throw new Error(err); });

        expect(window.fetch).toHaveBeenCalledTimes(1);
    });

    it('correctly uses the same origin credentials when getting data', () => {
        window.fetch = jest.fn().mockImplementation(() => Promise.resolve(mockResponse(200, null, '{}')));

        const dao = new CardCollectionDAO();

        dao.getData().catch((err) => { throw new Error(err); });

        expect(window.fetch).toBeCalledWith(expect.anything(), { credentials: 'same-origin' });
    });

    it('correctly formats the fetch string when instantiated with no arguments when getting data', () => {
        window.fetch = jest.fn().mockImplementation(() => Promise.resolve(mockResponse(200, null, '{}')));

        const dao = new CardCollectionDAO();

        dao.getData().catch((err) => { throw new Error(err); });
        const correctFetchString = '.collection.json/sort-popular/results-10.1.json';
        expect(window.fetch).toBeCalledWith(correctFetchString, expect.anything());
    });

    it('correctly formats the fetch string with all the keyword arguments except filter when getting data', () => {
        window.fetch = jest.fn().mockImplementation(() => Promise.resolve(mockResponse(200, null, '{}')));

        const endpoint = 'archive';
        const sort = 'name';
        const results = 8;
        const page = 2;

        const dao = new CardCollectionDAO({
            endpoint, sort, results, page,
        });

        dao.getData().catch((err) => { throw new Error(err); });
        const correctFetchString = `${endpoint}.collection.json/sort-${sort}/results-${results}.${page}.json`;
        expect(window.fetch).toBeCalledWith(correctFetchString, expect.anything());
    });

    it('correctly formats the filters when getting data', () => {
        window.fetch = jest.fn().mockImplementation(() => Promise.resolve(mockResponse(200, null, '{}')));

        const endpoint = 'archive';
        const activeFilters = ['filter-one', 'filter-two'];
        const dao = new CardCollectionDAO({ endpoint, activeFilters });

        dao.getData().catch((err) => { throw new Error(err); });
        const correctFetchString = `${endpoint}.collection.json/sort-popular/${activeFilters[0]}/${activeFilters[1]}/results-10.1.json`;
        expect(window.fetch).toBeCalledWith(correctFetchString, expect.anything());
    });

    it('correctly sets the sorting property', () => {
        const dao = new CardCollectionDAO();
        dao.setSort('name');
        expect(dao.sort).toBe('name');
    });

    it('correctly defaults to "popular" sorting when given an invalid sort value', () => {
        const dao = new CardCollectionDAO();
        dao.setSort('some invalid sort');
        expect(dao.sort).toBe('popular');
    });

    it('correctly sets the results property', () => {
        const dao = new CardCollectionDAO();
        dao.setResults(5);
        expect(dao.results).toBe(5);
    });

    it('correctly defaults to 10 for results when given an invalid results value', () => {
        const dao = new CardCollectionDAO();
        dao.setResults('a string');
        expect(dao.results).toBe(10);
    });

    it('correctly sets the page property', () => {
        const dao = new CardCollectionDAO();
        dao.setPage(2);
        expect(dao.page).toBe(2);
    });

    it('correctly defaults to 1 for page when given an invalid page value', () => {
        const dao = new CardCollectionDAO();
        dao.setPage('a string');
        expect(dao.page).toBe(1);
    });

    it('correctly fetches the next page', () => {
        window.fetch = jest.fn().mockImplementation(() => Promise.resolve(mockResponse(200, null, '{}')));

        const endpoint = 'archive';
        const page = 1;
        const dao = new CardCollectionDAO({ endpoint, page });

        dao.nextPage().catch((err) => { throw new Error(err); });
        const correctFetchString = `${endpoint}.collection.json/sort-popular/results-10.${page + 1}.json`;
        expect(window.fetch).toBeCalledWith(correctFetchString, expect.anything());
    });
});
