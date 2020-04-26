/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import PropTypes from 'prop-types';

const pagination = props => (
    <section
        aria-label={props.paginationLabel}
        className="pagination">
        <span id="paginationPageText">{props.pageText}</span>
        <ul className={props.isMobile ? 'pagination_mobile' : ''}>
            {props.showLeftDoubleCheveron && (
                <span
                    className={props.showLeftDoubleCheveron ? '' : 'hidden'}
                    onClick={props.onGoToTheFirstPage}>
                    <i
                        aria-label={props.firstPageText}
                        className="spectrumIcon_chevronDoubleLeft" />
                </span>
            )}
            {props.showLeftCheveron && (
                <span
                    id="left-chevron"
                    aria-labelledby="paginationPrev paginationPageText"
                    className={props.showLeftCheveron ? '' : 'hidden'}
                    onClick={props.onGoToPreviousPage}>
                    <i className="spectrumIcon_chevronLeft" />
                    {props.prevText}
                </span>
            )}
            {props.pageList.map(page => (
                <li
                    key={page}
                    className={props.currentPage === page ? 'active' : ''}>
                    <a onClick={() => props.onGoToPage(page)}>{page}</a>
                </li>
            ))}
            {props.showRightCheveron && (
                <span
                    aria-labelledby="paginationNext paginationPageText"
                    id="right-chevron"
                    className={props.showRightCheveron ? '' : 'hidden'}
                    onClick={props.onGoToNextPage}>
                    { props.nextText }
                    <i className="spectrumIcon_chevronRight" />
                </span>
            )}
            {props.showRightDoubleCheveron && (
                <span
                    className={props.showRightDoubleCheveron ? '' : 'hidden'}
                    onClick={props.onGoToTheLastPage}>
                    <i
                        aria-label={props.lastPageText}
                        className="spectrumIcon_chevronDoubleRight" />
                </span>
            )}
        </ul>
    </section>
);

pagination.propTypes = {
    pageList: PropTypes.arrayOf(PropTypes.any).isRequired,
    onGoToTheLastPage: PropTypes.func.isRequired,
    onGoToNextPage: PropTypes.func.isRequired,
    onGoToTheFirstPage: PropTypes.func.isRequired,
    onGoToPreviousPage: PropTypes.func.isRequired,
    lastPageText: PropTypes.string,
    firstPageText: PropTypes.string,
    nextText: PropTypes.string,
    prevText: PropTypes.string,
    pageText: PropTypes.string,
    paginationLabel: PropTypes.string,
    currentPage: PropTypes.number,
    isMobile: PropTypes.bool,
    showRightCheveron: PropTypes.bool,
    showLeftCheveron: PropTypes.bool,
    showRightDoubleCheveron: PropTypes.bool,
    showLeftDoubleCheveron: PropTypes.bool,
};

pagination.defaultProps = {
    lastPageText: 'last-page',
    firstPageText: 'first-page',
    nextText: 'next',
    isMobile: false,
    showRightCheveron: true,
    showLeftCheveron: true,
    currentPage: 1,
    prevText: 'previous',
    showRightDoubleCheveron: true,
    showLeftDoubleCheveron: true,
    pageText: 'page',
    paginationLabel: 'pagination',
};

export default pagination;
