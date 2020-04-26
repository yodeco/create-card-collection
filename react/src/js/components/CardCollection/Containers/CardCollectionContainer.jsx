import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import Card from './CardContainer';

import CardCollectionDAO from '../Utilities/CardCollectionDAO';
import { store as newStore } from '../index';

import SortbyContainer from './SortByContainer';
import PaginationContainer from './PaginationContainer';
import FilterPanelContainer from './FilterPanelContainer';
import ShowMoreCardContainer from './ShowMoreCardContainer';

import * as actions from '../Actions/index';
import SortingMethods from '../Constants/SortingMethods';

/** Class representing the UI for the Spectrum Accordion. */
export default class CardCollectionContainer extends React.Component {
    static PLACEHOLDER_COUNT = '{count}';
    static PAGINATION_PAGES = 'pages';
    static PAGINATION_SCROLL = 'scroll';

    constructor(props) {
        super(props);
        this.showMobileHeaders = false;
        this.resultsToLoad = null;
        this.hasTags = false;
        this.tagList = {};
        this.byText = this.props.byText;


        this.state = {
            tags: {},
            cards: [],
            sort: this.props.defaultSort || SortingMethods.SORT_BY_POPULAR,
        };

        this.setDao();

        this.getCollectionType();

        this.shouldEnableFilterPanel = this.shouldEnableFilterPanel.bind(this);
        this.loadMoreCards = this.loadMoreCards.bind(this);

        this.updateCards = this.updateCards.bind(this);

        newStore.subscribe(() => {
            this.setState({});
        });

        window.newStore = newStore;
    }

    getByText() {
        return this.byText;
    }

    setDao() {
        this.dao = new CardCollectionDAO({
            endpoint: this.currentPageEndpoint(),
            pageType: this.pageType,
            sort: this.state.sort,
            results: this.resultsPerPage,
            page: 1,
        });
    }

    /**
     * Get the tag object for the associated tag key
     *
     * @param {string} tagKey
     * @returns {object} tag object containing {title, color, url}
     * @memberof CardCollection
     */
    getTag(card) {
        let cardTagId;
        if (typeof card.primaryTagId !== 'undefined') {
            cardTagId = card.primaryTagId;
        } else if (typeof card.tags !== 'undefined') {
            [cardTagId] = card.tags;
        }
        if (Object.prototype.hasOwnProperty.call(this.tagList, cardTagId)) {
            return this.tagList[cardTagId];
        }
        return {};
    }

    getFiltersRootId() {
        if (this.props.filtersRoot.substr(this.props.filtersRoot.length - 1) === ':') {
            this.filtersRootId = this.props.filtersRoot.slice(0, -1);
        } else {
            this.filtersRootId = this.props.filtersRoot;
        }
    }

    getData() {
        this.dao
            .getData()
            .then((data) => {
                this.loadNewData(data);
                this.handleEvents();
            }).catch(err => console.log(err));
    }

    getTags(tags) {
        const tagArray = Object.keys(tags);
        tagArray.forEach((name) => {
            const tag = tags[name];

            if (tag.id === this.filtersRootId) {
                this.tags = tag.tags;
            }

            this.tagList[tag.id] = tag;
            if (tag.tags) {
                this.getTags(tag.tags);
            }
        });
    }

    /**
     * Set the sorting to by name
     *
     * @memberof CardCollection
     */
    setSortByName() {
        this.setSort(SortbyContainer.SORT_BY_NAME);
    }

    /**
     * Set the sorting to by popular
     *
     * @memberof CardCollection
     */
    setSortByPopular() {
        this.setSort(SortbyContainer.SORT_BY_POPULAR);
    }

    /**
     * Set the sort order for the cards
     *
     * @param {string} sortBy One of the static strings SortByContainer.SORT_BY_NAME
     *                        or SortByContainer.SORT_BY_POPULAR
     * @memberof CardCollection
     */
    setSort(sortBy) {
        if (this.state.sort !== sortBy) {
            const loadedPages = this.page;
            // Load the first new page of results
            this.dao
                .setSort(sortBy)
                .setPage(1)
                .getData()
                .then((data) => {
                    this.loadNewData(data);
                })
                .then(() => {
                    // When "Show More" is enabled:
                    // Keep loading cards until we match the previous page total
                    if (this.paginationType === CardCollectionContainer.PAGINATION_SCROLL &&
                        loadedPages > this.page) {
                        this.loadMoreCards(loadedPages);
                    }
                })
                .then(() => {
                    // this.sendAnalytics(`sort-${this.state.sort}`, 'click');
                })
                .catch(err => console.log(err));
        }
    }

    /**
     * Set the text used on the button for <code>Show {count} more</code> text.
     *
     * Replace <code>{count}</code> with the number of results that will load. If there are more
     * remaining results than results per page, the number is the results per page. If three are
     * less remaining than results per page, the number is the results remaining.
     */
    getLoadMoreLabel() {
        if (this.props.showMoreLabel.includes(CardCollectionContainer.PLACEHOLDER_COUNT)) {
            return this.props.showMoreLabel
                .replace(CardCollectionContainer.PLACEHOLDER_COUNT, this.resultsToLoad);
        }

        return this.showMoreLabel;
    }

    /**
     * Determine the number of cards that will load on the next page.
     */
    setResultsToLoad() {
        const resultsLoaded = this.page * this.resultsPerPage;
        const resultsRemaining = this.totalResults - resultsLoaded;

        this.resultsToLoad = resultsRemaining < this.resultsPerPage
            ? resultsRemaining
            : this.resultsPerPage;
    }

    getCollectionType() {
        if (this.props.pageType === 'archive') {
            this.getFiltersRootId();
            this.dao.page = 1;
            this.dao.activeFilters = [];
            this.getData();
        } else {
            this.getData();
        }
    }

    /**
     * Handle page and filter events.
     *
     * @memberof CardCollection
     */
    handleEvents() {
    }

    updateCards() {
        const allFilters = newStore.getState().filterPanel.filterItems;
        const activeFilters = allFilters.filter(item => item.checked === true);
        const activeFilterIds = [];

        activeFilters.forEach((filter) => {
            activeFilterIds.push(filter.id);
        });

        this.dao.page = 1;
        this.dao.activeFilters = activeFilterIds;
        this.getData();
    }

    /**
     * Get the current page minus '.html' postfix
     *
     * @returns {string} current relative page url minus '.html'
     * @memberof CardCollection
     */
    currentPageEndpoint() {
        const pn = window.location.pathname;
        if (pn.substr(pn.length - 5, pn.length) === '.html') {
            return pn.substr(0, pn.length - 5);
        }
        return pn;
    }

    /**
     * Replace all cards on the page with given data
     *
     * @param {object} data json data from server
     * @memberof CardCollection
     */
    loadNewData(data) {
        this.page = data.page;
        if (data.sort !== this.state.sort) {
            this.setState({ sort: data.sort });
        }
        this.totalResults = data.totalResults;

        // Don't load tags again if we already have them
        if (this.hasTags === false && data.tags) {
            this.tags = data.tags;
            this.getTags(data.tags);
            this.hasTags = true;
            newStore.dispatch(actions.setTags(this.tags));
            newStore.dispatch(actions.setFilterGroups(this.tags));
            newStore.dispatch(actions.setFilterItems(this.tags));
        }
        this.totalPages = data.totalPages;

        this.cards = data.cards;
        this.setResultsToLoad();
        this.resultsLoaded = data.cards.length;

        this.setState({
            tags: this.tags,
            cards: this.cards,
        });

        newStore.dispatch(actions.setPageIndex(this.page));
        newStore.dispatch(actions.setNumberOfPages(this.totalPages));
    }

    filterBtnTxt() {
        if (!this.showMobileHeaders) {
            return this.filtersText || 'Filters';
        }
        return this.filtersCloseText || 'Close';
    }

    shouldEnableFilterPanel() {
        if (this.props.enableFilterPanel === null) { return false; }
        return true;
    }

    /**
     * Load one more "page" of cards and add to the this.cards array
     *
     * @param {int} [loadUntilPage] Continue loading page data until this page
     * @memberof CardCollection
     */
    loadMoreCards(loadUntilPage = 0) {
        return this.dao
            .nextPage()
            .then((data) => {
                // Show message only before the first card on the new page.
                if (data.cards && data.cards.length > 0) {
                    data.cards[0].showNewResultsLoaded = true;
                }

                this.page = data.page;

                // merge tags data in case any new tags have been added in the new cards
                // Object.assign(this.tags, data.tags);
                this.cards = this.cards.concat(data.cards);
                // Load more data if loadUntilPage is set
                if (loadUntilPage && loadUntilPage > this.page) {
                    this.loadMoreCards(loadUntilPage);
                }

                this.setResultsToLoad();
                this.resultsLoaded = data.cards.length;
            })
            .then(() => {
                this.setState({
                    cards: this.cards,
                });
                // this.sendAnalytics('loadmore', 'click');
                newStore.dispatch(actions.setPageIndex(this.page));
                newStore.dispatch(actions.setNumberOfPages(this.totalPages));
            })
            .catch(err => console.log(err));
    }
    isPaginationScroll() {
        return this.props.paginationType === CardCollectionContainer.PAGINATION_SCROLL;
    }

    isPaginationPages() {
        return this.props.paginationType === CardCollectionContainer.PAGINATION_PAGES;
    }

    /**
     * Should the showMore button be displayed
     *
     * @returns {boolean} Are there more cards available to load
     * @memberof CardCollection
     */
    shouldShowMore() {
        return this.page < this.totalPages;
    }

    /**
     * TODO: Need to implement real fix for this.
     */
    scrollToTop() {
        document.documentElement.scrollTop = 500;
    }

    pageChange(newPage) {
        if (newPage !== this.currentPage) {
            this.dao
                .setPage(newPage)
                .getData()
                .then((data) => {
                    this.loadNewData(data);
                    this.scrollToTop();
                })
                .then(() => {
                    // this.sendAnalytics('pagechange', 'click');
                });
        }
    }

    /**
     * Get the flex class that corresponds to the AEM showMorePosition value
     *
     * @returns {string} flex class for show more button position
     * @memberof CardCollection
     */
    showMorePositionFlex() {
        let smp;
        switch (this.props.showMorePosition) {
            case 'right':
                smp = 'flex-end';
                break;
            case 'left':
                smp = '';
                break;
            default:
                smp = 'center';
        }
        return smp;
    }

    isBlackBackground() {
        return this.props.backgroundColor === '#000000';
    }

    toggleShowMobileHeaders() {
        this.showMobileHeaders = !this.showMobileHeaders;
    }

    render() {
        const showMobileHeaders = this.showMobileHeaders ? 'filters-show-headers' : '';
        const cards = this.state.cards || [];
        const shouldOutlineWhite = this.isBlackBackground() ? 'button_cta-outlineWhite' : '';

        return (
            <Fragment>
                {this.props.pageType === 'archive' &&
                <div className="display-filters-btn mobile-only">
                    <button
                        className="spectrum-Button spectrum-Button--cta"
                        onClick={() => this.toggleShowMobileHeaders()}
                        aria-label={this.getLoadMoreLabel()}>
                        {this.filterBtnTxt()}
                    </button>
                </div>}
                {this.props.pageType === 'archive' &&
                <FilterPanelContainer
                    updateCards={this.updateCards}
                    clearText={this.props.clearText}
                    filtersText={this.props.filtersText}
                    searchFiltersLabel={this.props.searchFiltersLabel}
                    showHeaders={this.showMobileHeaders}
                    tagGroups={this.state.tags} />}
                <div
                    className="card-collection"
                    role="region"
                    aria-label={this.searchResultsLabel}>
                    <div
                        className={`card-collection_header ${showMobileHeaders}`}>
                        <SortbyContainer
                            ariaControlsId={this.props.id}
                            displayResults={this.props.pageType !== 'collection'}
                            totalResults={this.totalResults}
                            sort={this.state.sort}
                            nameSortText={this.props.nameSortText}
                            popularSortText={this.props.popularSortText}
                            resultsText={this.props.resultsText}
                            sortByText={this.props.sortByText}
                            sortingOptionsText={this.props.sortingOptionsText}
                            triggerSortByName={() => this.setSortByName()}
                            triggerSortByPopular={() => this.setSortByPopular()} />
                    </div>
                    <div className="card-collection_cards" id={this.props.id}>
                        {cards.map(card => (<Card
                            key={card.primaryTagId}
                            byText={this.getByText()}
                            {...card}
                            tag={this.getTag(card)} />))}
                        {this.isPaginationScroll() && this.props.showMoreType === 'card'
                        && this.shouldShowMore() &&
                        <ShowMoreCardContainer
                            loadMoreCards={() => this.loadMoreCards} />}
                        {this.totalResults === 0 &&
                        <h3 className="no-Results">{this.noResultsText}</h3>}
                    </div>
                    {this.isPaginationPages() &&
                    <PaginationContainer
                        pageText={this.props.pageText}
                        nextText={this.props.nextText}
                        prevText={this.props.prevText}
                        firstPageText={this.props.firstPageText}
                        lastPageText={this.props.lastPageText}
                        paginationLabel={this.props.paginationLabel}
                        onPageChange={page => this.pageChange(page)} />}
                    {this.isPaginationScroll() && this.props.showMoreType === 'button' &&
                    <div
                        className="card-collection_footer"
                        style={{ justifyContent: this.showMorePositionFlex() }}>
                        {this.shouldShowMore() &&
                        <button
                            className={`${shouldOutlineWhite}spectrum-Button spectrum-Button--cta`}
                            onClick={this.loadMoreCards}
                            aria-label={this.getLoadMoreLabel()}>
                            {this.props.showMoreText}
                        </button>}
                    </div>}
                </div>
            </Fragment>
        );
    }
}

CardCollectionContainer.defaultProps = {
    byText: '',
    defaultSort: '',
    filtersRoot: '',
    pageType: '',
    showMoreLabel: [''],
    enableFilterPanel: '',
    showMorePosition: '',
    paginationType: '',
    backgroundColor: '',
    clearText: '',
    showMoreText: 'Show more',
    pageText: '',
    nextText: '',
    prevText: '',
    showMoreType: 'button',
    firstPageText: '',
    lastPageText: '',
    paginationLabel: '',
    noResultsText: '',
    nameSortText: '',
    popularSortText: '',
    resultsText: '',
    sortByText: '',
    sortingOptionsText: '',
    id: '',
    filtersText: '',
    searchFiltersLabel: '',
};

CardCollectionContainer.propTypes = {
    byText: PropTypes.string,
    defaultSort: PropTypes.string,
    filtersRoot: PropTypes.string,
    pageType: PropTypes.string,
    showMoreLabel: PropTypes.arrayOf(PropTypes.string),
    enableFilterPanel: PropTypes.string,
    showMorePosition: PropTypes.string,
    paginationType: PropTypes.string,
    backgroundColor: PropTypes.string,
    clearText: PropTypes.string,
    showMoreText: PropTypes.string,
    pageText: PropTypes.string,
    nextText: PropTypes.string,
    prevText: PropTypes.string,
    showMoreType: PropTypes.string,
    firstPageText: PropTypes.string,
    lastPageText: PropTypes.string,
    paginationLabel: PropTypes.string,
    noResultsText: PropTypes.string,
    nameSortText: PropTypes.string,
    popularSortText: PropTypes.string,
    resultsText: PropTypes.string,
    sortByText: PropTypes.string,
    sortingOptionsText: PropTypes.string,
    id: PropTypes.string,
    filtersText: PropTypes.string,
    searchFiltersLabel: PropTypes.string,
};
