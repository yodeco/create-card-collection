import React from 'react';
import PropTypes from 'prop-types';
import Pagination from '../Components/Pagination';
import * as actions from '../Actions/index';
import { store } from '../index';

class PaginationContainer extends React.Component {
    static DESKTOP_PAGE_COUNT = 10;
    static MOBILE_PAGE_COUNT = 4;

    constructor(props) {
        super(props);
        this.triggerGoToNextPage = this.triggerGoToNextPage.bind(this);
        this.triggerGoToPreviousPage = this.triggerGoToPreviousPage.bind(this);
        this.triggerGoToTheFirstPage = this.triggerGoToTheFirstPage.bind(this);
        this.triggerGoToTheLastPage = this.triggerGoToTheLastPage.bind(this);
        this.triggerGoToPage = this.triggerGoToPage.bind(this);
        this.generatePageList = this.generatePageList.bind(this);

        this.showLeftCheveron = this.showLeftCheveron.bind(this);
        this.showDoubleLeftCheveron = this.showDoubleLeftCheveron.bind(this);
        this.showRightCheveron = this.showRightCheveron.bind(this);
        this.showDoubleRightCheveron = this.showDoubleRightCheveron.bind(this);

        this.pageList = this.pageList.bind(this);
        this.mobilePageList = this.mobilePageList.bind(this);
        this.desktopPageList = this.desktopPageList.bind(this);

        this.resize = this.resize.bind(this);

        this.state = { isMobile: window.innerWidth < 600 };
    }

    componentDidMount() {
        window.addEventListener('resize', this.resize, false);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.resize, false);
    }

    resize() {
        this.setState({ isMobile: window.innerWidth < 600 });
    }


    triggerGoToNextPage() {
        store.dispatch(actions.incrementPageIndex());
        const newPageIndex = store.getState().pagination.currentPage;
        this.props.onPageChange(newPageIndex);
    }

    triggerGoToPreviousPage() {
        store.dispatch(actions.decrementPageIndex());
        const newPageIndex = store.getState().pagination.currentPage;
        this.props.onPageChange(newPageIndex);
    }

    triggerGoToTheFirstPage() {
        store.dispatch(actions.setPageIndexAsFirst());
        const newPageIndex = store.getState().pagination.currentPage;
        this.props.onPageChange(newPageIndex);
    }

    triggerGoToTheLastPage() {
        store.dispatch(actions.setPageIndexAsLast());
        const newPageIndex = store.getState().pagination.currentPage;
        this.props.onPageChange(newPageIndex);
    }

    triggerGoToPage(pageNumber) {
        store.dispatch(actions.setPageIndex(pageNumber));
        const newPageIndex = store.getState().pagination.currentPage;
        this.props.onPageChange(newPageIndex);
    }

    showLeftCheveron() {
        const currentPageIndex = store.getState().pagination.currentPage;
        return (currentPageIndex > 1);
    }

    showDoubleLeftCheveron() {
        const currentPageIndex = store.getState().pagination.currentPage;
        return (currentPageIndex > 1);
    }

    showRightCheveron() {
        const currentPageIndex = store.getState().pagination.currentPage;
        const totalNumberOfPages = store.getState().pagination.numberOfPages;

        return (currentPageIndex < totalNumberOfPages);
    }

    showDoubleRightCheveron() {
        const currentPageIndex = store.getState().pagination.currentPage;
        const totalNumberOfPages = store.getState().pagination.numberOfPages;

        return (currentPageIndex < totalNumberOfPages);
    }

    pageList(isMobile) {
        if (isMobile) { return this.mobilePageList(); }
        return this.desktopPageList();
    }

    desktopPageList() {
        return this.generatePageList(
            PaginationContainer.DESKTOP_PAGE_COUNT,
            store.getState().pagination.currentPage,
            store.getState().pagination.numberOfPages,
        );
    }

    mobilePageList() {
        return this.generatePageList(
            PaginationContainer.MOBILE_PAGE_COUNT,
            store.getState().pagination.currentPage,
            store.getState().pagination.numberOfPages,
        );
    }


    /**
     * @method generatePageList
     * @param {number} pageCount - Total pages to display
     * @param {number} currentPageNumber - Current page user is on
     * @param {number} totalPages - Total number of pages available
     * @return {Array}
     * @description Return array of pages up to a max length of pageCount
     * @memberOf Pagination
     */
    generatePageList(pageCount, currentPageNumber, totalPages) {
        const halfPageCount = Math.floor(pageCount / 2);
        let start;
        let end;

        if (totalPages <= (pageCount + 1)) {
            // show all pages
            start = 1;
            end = totalPages;
        } else {
            start = Math.min(
                Math.max(1, currentPageNumber - halfPageCount),
                totalPages - pageCount,
            );
            end = Math.max(
                Math.min(currentPageNumber + halfPageCount, totalPages),
                pageCount + 1,
            );
        }

        return this.range(start, end);
    }

    // Return a range
    range(startVal, end) {
        let start = startVal; // required due to no-param-reassign eslint rule
        let step = 1;
        const range = [];

        if (end < start) {
            step = -step;
        }

        while (step > 0 ? end >= start : end <= start) {
            range.push(start);
            start += step;
        }

        return range;
    }

    render() {
        const paginationState = store.getState().pagination;

        return (
            <div>
                <Pagination
                    pageText={this.props.pageText}
                    nextText={this.props.nextText}
                    prevText={this.props.prevText}
                    firstPageText={this.props.firstPageText}
                    lastPageText={this.props.lastPageText}
                    paginationLabel={this.props.paginationLabel}

                    isMobile={this.state.isMobile}

                    showLeftCheveron={this.showLeftCheveron()}
                    showLeftDoubleCheveron={this.showDoubleLeftCheveron()}
                    showRightCheveron={this.showRightCheveron()}
                    showRightDoubleCheveron={this.showDoubleRightCheveron()}

                    currentPage={paginationState.currentPage}
                    numberOfPages={paginationState.numberOfPages}
                    pageList={this.pageList(this.state.isMobile)}

                    onGoToTheFirstPage={this.triggerGoToTheFirstPage}
                    onGoToTheLastPage={this.triggerGoToTheLastPage}
                    onGoToPreviousPage={this.triggerGoToPreviousPage}
                    onGoToPage={this.triggerGoToPage}
                    onGoToNextPage={this.triggerGoToNextPage} />
            </div>
        );
    }
}

PaginationContainer.propTypes = {
    pageText: PropTypes.string,
    nextText: PropTypes.string,
    prevText: PropTypes.string,
    firstPageText: PropTypes.string,
    lastPageText: PropTypes.string,
    paginationLabel: PropTypes.string,
    onPageChange: PropTypes.func,
};

PaginationContainer.defaultProps = {
    pageText: 'pageText',
    nextText: 'nextText',
    prevText: 'prevText',
    firstPageText: 'firstPageText',
    lastPageText: 'lastPageText',
    paginationLabel: 'paginationLabel',
    onPageChange: () => null,
};

export default PaginationContainer;
