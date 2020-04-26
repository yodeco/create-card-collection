import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import sinon from 'sinon';
import 'isomorphic-fetch';

import CardCollectionContainer from '../CardCollectionContainer';
import FilterPanelContainer from '../FilterPanelContainer';
import CardCollectionDAO from '../../Utilities/CardCollectionDAO';
import { CardContainer } from '../CardContainer';
import ShowMoreCardContainer from '../ShowMoreCardContainer';
import PaginationContainer from '../PaginationContainer';

Enzyme.configure({ adapter: new Adapter() });

describe('the conditional rendering behavior', () => {
    describe('the synchronous ones', () => {
        let wrapper;
        let stub;

        beforeEach(() => {
            stub = sinon.stub(CardCollectionDAO.prototype, 'getData');
            stub.callsFake(() => new Promise((resolve) => {
                resolve({ cards: [{ showNewResultsLoaded: true }], page: 0, totalPages: 10 });
            }));
        });

        afterEach(() => {
            stub.restore();
        });

        it('shows the display-filters-btn when the pageType prop is "archive"', () => {
            wrapper = shallow(<CardCollectionContainer pageType="archive" />);
            expect(wrapper.find('.display-filters-btn')).toHaveLength(1);
        });

        it('shows the FilterPanelContainer when the pageType prop is "archive"', () => {
            wrapper = shallow(<CardCollectionContainer pageType="archive" />);
            expect(wrapper.find(FilterPanelContainer)).toHaveLength(1);
        });

        it('does not show the display-filters-btn when the pageType prop is not "archive"', () => {
            wrapper = shallow(<CardCollectionContainer pageType="test" />);
            expect(wrapper.find('.display-filters-btn')).toHaveLength(0);
        });

        it('does not show the FilterPanelContainer when the pageType prop is not "archive"', () => {
            wrapper = shallow(<CardCollectionContainer pageType="test" />);
            expect(wrapper.find(FilterPanelContainer)).toHaveLength(0);
        });

        it('renders a PaginationContainer if paginationType === pages', () => {
            wrapper = shallow(<CardCollectionContainer paginationType="pages" />);
            expect(wrapper.find(PaginationContainer)).toHaveLength(1);
        });

        it('renders a card-collection_footer if paginationType === scroll and showMoreType === button', () => {
            wrapper = shallow(<CardCollectionContainer paginationType="scroll" showMoreType="button" />);
            expect(wrapper.find('.card-collection_footer')).toHaveLength(1);
        });
    });

    describe('the async actions', () => {
        describe('first set of tests (with one stub configuration', () => {
            let wrapper;
            let stub;
            let promise;

            beforeEach(() => {
                promise = new Promise((resolve) => {
                    resolve({ cards: [{ showNewResultsLoaded: true }], page: 0, totalPages: 10 });
                });
                stub = sinon.stub(CardCollectionDAO.prototype, 'getData');
                stub.callsFake(() => promise);
            });

            afterEach(() => {
                stub.restore();
            });

            it('renders a list of cards by using CardCollectionDao\'s nextPage method which returns a promise', (done) => {
                wrapper = shallow(<CardCollectionContainer pageType="archive" />);
                promise.then(() => {
                    wrapper.update();
                    expect(wrapper.find(CardContainer)).toHaveLength(1);
                    done();
                });
            });

            it('renders a ShowMoreCardContainer if pagination is scroll, showMoreType == card, and shouldShowMore returns true', (done) => {
                wrapper = shallow(<CardCollectionContainer pageType="test" paginationType="scroll" showMoreType="card" />);
                promise.then(() => {
                    wrapper.update();
                    expect(wrapper.find(ShowMoreCardContainer)).toHaveLength(1);
                    done();
                });
            });

            it('does not render a ShowMoreCardContainer if either pagination is scroll, showMoreType == card, and shouldShowMore returns false', (done) => {
                wrapper = shallow(<CardCollectionContainer pageType="test" paginationType="notscroll" showMoreType="card" />);
                promise.then(() => {
                    wrapper.update();
                    expect(wrapper.find(ShowMoreCardContainer)).toHaveLength(0);
                    done();
                });
            });
        });

        describe('second set of tests with different stub configs', () => {
            let wrapper;
            let stub;
            let promise;

            beforeEach(() => {
                promise = new Promise((resolve) => {
                    resolve({
                        cards: [
                            { showNewResultsLoaded: true },
                        ],
                        page: 0,
                        totalPages: 0,
                        totalResults: 0,
                    });
                });
                stub = sinon.stub(CardCollectionDAO.prototype, 'getData');
                stub.callsFake(() => promise);
            });

            afterEach(() => {
                stub.restore();
            });

            it('renders a no-Results class element if promise returns totalResults = 0', (done) => {
                wrapper = shallow(<CardCollectionContainer noResultsText="text" />);

                promise.then(() => {
                    wrapper.update();
                    expect(wrapper.find('.no-Results')).toHaveLength(1);
                    done();
                });
            });
        });
    });
});

describe('how the component passes props to children', () => {
    describe('mobile the header behavior', () => {
        let wrapper;
        let stub;

        beforeEach(() => {
            stub = sinon.stub(CardCollectionDAO.prototype, 'getData');
            stub.callsFake(() => new Promise((resolve) => {
                resolve({ cards: [{ page: '', showNewResultsLoaded: true }], page: 0, totalPages: 10 });
            }));
            wrapper = shallow(<CardCollectionContainer pageType="archive" />);
        });

        afterEach(() => {
            stub.restore();
        });


        it('does not add a filters-show-headers class to the card-collection_header by default', () => {
            expect(wrapper.find('.card-collection_header').hasClass('filters-show-headers')).toBe(false);
        });
    });

    describe('the footer button', () => {
        let wrapper;
        let stub;
        let promise;

        beforeEach(() => {
            stub = sinon.stub(CardCollectionDAO.prototype, 'getData');
            promise = new Promise((resolve) => {
                resolve({ cards: [{ page: '', showNewResultsLoaded: true }], page: 0, totalPages: 10 });
            });
            stub.callsFake(() => promise);
        });

        afterEach(() => {
            stub.restore();
        });

        it('renders a button with the class button_cta-outlineWhitespectrum-Button if the backgroundColor prop is black', () => {
            wrapper = shallow(<CardCollectionContainer backgroundColor="#000000" pageType="archive" />);
            promise.then(() => {
                expect(wrapper.find('.button_cta-outlineWhitespectrum-Button')).toHaveLength(1);
            }).catch(() => {});
        });

        it('does not render a button with the class button_cta-outlineWhitespectrum-Button if the backgroundColor prop is not black', () => {
            wrapper = shallow(<CardCollectionContainer backgroundColor="#100000" />);
            promise.then(() => {
                expect(wrapper.find('.button_cta-outlineWhitespectrum-Button')).toHaveLength(0);
            }).catch(() => {});
        });
    });

    describe('the filter button', () => {
        let wrapper;
        let stub;
        let promise;

        beforeEach(() => {
            stub = sinon.stub(CardCollectionDAO.prototype, 'getData');
            promise = new Promise((resolve) => {
                resolve({ cards: [{ page: '', showNewResultsLoaded: true }], page: 0, totalPages: 10 });
            });
            stub.callsFake(() => promise);
        });

        afterEach(() => {
            stub.restore();
        });

        it('displays filters', () => {
            wrapper = shallow(<CardCollectionContainer pageType="archive" />);
            expect(wrapper.find('.display-filters-btn').text()).toEqual('Filters');
        });

        it('displays close when enableFiltersPanel is null', () => {
            wrapper = shallow(<CardCollectionContainer pageType="archive" />);
            promise.then(() => {
                wrapper.instance().showMobileHeaders = true;
                expect(wrapper.find('.display-filters-btn').text()).toEqual('Close');
            });
        });
    });

    describe('should enable filter panel', () => {
        let wrapper;
        let stub;
        let promise;

        beforeEach(() => {
            stub = sinon.stub(CardCollectionDAO.prototype, 'getData');
            promise = new Promise((resolve) => {
                resolve({ cards: [{ page: '', showNewResultsLoaded: true }], page: 0, totalPages: 10 });
            });
            stub.callsFake(() => promise);
        });

        afterEach(() => {
            stub.restore();
        });

        it('return true by default', () => {
            wrapper = shallow(<CardCollectionContainer pageType="archive" />);
            expect(wrapper.instance().shouldEnableFilterPanel()).toBe(true);
        });

        it('returns false if enableFilterPanel is null', () => {
            wrapper = shallow(<CardCollectionContainer pageType="archive" enableFilterPanel={null} />);
            expect(wrapper.instance().shouldEnableFilterPanel()).toBe(false);
        });
    });

    describe('the loadMoreCards method', () => {
        let wrapper;
        let stub1;
        let stub2;
        let promise1;
        let promise2;

        beforeEach(() => {
            stub1 = sinon.stub(CardCollectionDAO.prototype, 'getData');
            promise1 = new Promise((resolve) => {
                resolve({ cards: [{ page: '', showNewResultsLoaded: true }], page: 0, totalPages: 10 });
            });
            stub1.callsFake(() => promise1);

            stub2 = sinon.stub(CardCollectionDAO.prototype, 'nextPage');
            promise2 = new Promise((resolve) => {
                resolve({ cards: [{ page: '', showNewResultsLoaded: true }], page: 1, totalPages: 10 });
            });
            stub2.callsFake(() => promise2);
        });

        afterEach(() => {
            stub1.restore();
        });

        it('pushes things to this.state.cards', () => {
            wrapper = shallow(<CardCollectionContainer pageType="archive" />);
            promise1.then(() => {
                expect(wrapper.instance().state.cards).toHaveLength(1);
                wrapper.instance().loadMoreCards();
                promise2.then(() => {
                    expect(wrapper.instance().state.cards).toHaveLength(2);
                });
            });
        });
    });
});
