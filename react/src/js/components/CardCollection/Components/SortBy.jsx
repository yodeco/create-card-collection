import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Popup extends Component {
    render() {
        const active = this.props.isOpen ? 'active' : 'inactive';
        const sortedByPopular = (this.props.sortedBy === 'popular') ? 'active' : 'inactive';
        const sortedByName = (this.props.sortedBy === 'name') ? 'active' : 'inactive';

        return (
            <div
                className="card-collection_sort"
                role="toolbar"
                aria-label={this.props.sortingOptionsText}
                aria-controls={this.props.ariaControlsId}>
                <span id="total-results">
                    {this.props.totalResults} {this.props.resultsText}
                </span>

                <button
                    ref={this.props.setToggleSortButtonRef}
                    className={`${active} sortby_label `}
                    onKeyDown={this.props.onToggleSort}
                    onClick={this.props.onToggle}
                    aria-haspopup="true"
                    aria-expanded={this.props.isOpen.toString()}>
                    {this.props.sortByText || 'Sort By'}
                </button>
                <div
                    role="button"
                    tabIndex={0}
                    onKeyDown={this.props.onPopupKeydown}
                    className={`${active} sortby_popup `}>
                    <ul>
                        <li>
                            <button
                                ref={this.props.setPopularButtonRef}
                                onClick={this.props.onSortByPopular}
                                className={`${sortedByPopular} sortby popular`}
                                aria-label={this.props.popularSortText || 'Popular'} >
                                {this.props.popularSortText || 'Popular'}
                            </button>
                        </li>
                        <li>
                            <button
                                ref={this.props.setNameButtonRef}
                                onClick={this.props.onSortByName}
                                className={`${sortedByName} sortby name`}
                                aria-label={this.nameSortText || 'A-Z'} >
                                {this.nameSortText || 'A-Z'}
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        );
    }
}

Popup.propTypes = {
    setPopularButtonRef: PropTypes.func.isRequired,
    onSortByPopular: PropTypes.func.isRequired,
    setNameButtonRef: PropTypes.func.isRequired,
    onSortByName: PropTypes.func.isRequired,
    onPopupKeydown: PropTypes.func.isRequired,
    onToggle: PropTypes.func.isRequired,
    onToggleSort: PropTypes.func.isRequired,
    setToggleSortButtonRef: PropTypes.func.isRequired,
    popularSortText: PropTypes.string,
    sortByText: PropTypes.string,
    resultsText: PropTypes.string,
    ariaControlsId: PropTypes.string,
    sortingOptionsText: PropTypes.string,
    sortedBy: PropTypes.string,
    totalResults: PropTypes.number,
    isOpen: PropTypes.bool,
};

Popup.defaultProps = {
    popularSortText: 'Sort By Popular',
    sortByText: 'Sort By',
    resultsText: 'results',
    ariaControlsId: 'controlsId',
    sortingOptionsText: 'Sorting Options',
    sortedBy: 'name',
    totalResults: 1,
    isOpen: true,
};

export default Popup;
