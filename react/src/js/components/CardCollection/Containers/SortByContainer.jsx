import React from 'react';

import PropTypes from 'prop-types';
import SortBy from '../Components/SortBy';
import { togglePopup, setPopularSelected, setNameSelected } from '../Actions/index';
import { store } from '../index';
import Keys from '../Constants/KeyMapping';

class SortByContainer extends React.Component {
    static SORT_BY_NAME = 'name';
    static SORT_BY_POPULAR = 'popular';

    constructor(props) {
        super(props);
        this.setPopupStateAsPopular = this.setPopupStateAsPopular.bind(this);
        this.setPopupStateAsName = this.setPopupStateAsName.bind(this);
        this.popupKeydownHandler = this.popupKeydownHandler.bind(this);

        this.focusNameButton = this.focusNameButton.bind(this);
        this.focusPopularButton = this.focusPopularButton.bind(this);
        this.focusSortButton = this.focusSortButton.bind(this);
        this.toggleSortHandler = this.toggleSortHandler.bind(this);
    }

    setPopupStateAsPopular() {
        store.dispatch(setPopularSelected());
        this.props.triggerSortByPopular();
    }

    setPopupStateAsName() {
        store.dispatch(setNameSelected());
        this.props.triggerSortByName();
    }

    triggerToggle() {
        store.dispatch(togglePopup());
    }

    hasFocus = el => document.activeElement === el;

    focusPopularButton() {
        this.sortByPopularBtn.focus();
    }

    focusNameButton() {
        this.sortByNameBtn.focus();
    }

    focusSortButton() {
        this.toggleSortBtn.focus();
    }

    shouldPreventDefaultEvent(keyCode) {
        let preventDefault = false;

        if (keyCode === Keys.down || keyCode === Keys.up || keyCode === Keys.left) {
            preventDefault = true;
        }
        return preventDefault;
    }

    toggleSortHandler(ev) {
        const popupOpen = store.getState().sortBy.open;
        const { keyCode } = ev;

        if (keyCode === Keys.down) {
            this.sortByPopularBtn.focus();
            ev.preventDefault();
        }

        if ((keyCode === Keys.left && popupOpen) ||
            (keyCode === Keys.right && !popupOpen)) {
            this.triggerToggle();
            ev.preventDefault();
        }
    }

    popupKeydownHandler(ev) {
        const { keyCode } = ev;

        if (this.shouldPreventDefaultEvent(keyCode)) {
            ev.preventDefault();
        }

        if (keyCode === Keys.down) {
            this.focusNameButton();
        }

        if (keyCode === Keys.up) {
            if (this.hasFocus(this.sortByPopularBtn)) {
                this.focusSortButton();
            }
            if (this.hasFocus(this.sortByNameBtn)) {
                this.focusPopularButton();
            }
        }

        if (keyCode === Keys.left) {
            this.focusSortButton();
            this.triggerToggle();
        }
    }


    render() {
        const popupState = store.getState().sortBy;
        return (
            <div>
                <SortBy
                    ariaControlsId={this.props.ariaControlsId}
                    displayResults={this.props.displayResults}
                    totalResults={this.props.totalResults}
                    sort={this.props.sort}
                    nameSortText={this.props.nameSortText}
                    popularSortText={this.props.popularSortText}
                    resultsText={this.props.resultsText}
                    sortByText={this.props.sortByText}
                    sortingOptionsText={this.props.sortingOptionsText}

                    sortedBy={popupState.sortedBy}
                    isOpen={popupState.open}

                    setPopularButtonRef={(el) => { this.sortByPopularBtn = el; }}
                    setNameButtonRef={(el) => { this.sortByNameBtn = el; }}
                    setToggleSortButtonRef={(el) => { this.toggleSortBtn = el; }}

                    onToggleSort={this.toggleSortHandler}
                    onPopupKeydown={this.popupKeydownHandler}
                    onSortByPopular={this.setPopupStateAsPopular}
                    onSortByName={this.setPopupStateAsName}
                    onToggle={this.triggerToggle} />
            </div>
        );
    }
}

SortByContainer.propTypes = {
    ariaControlsId: PropTypes.string,
    displayResults: PropTypes.bool,
    nameSortText: PropTypes.string,
    sortingOptionsText: PropTypes.string,
    resultsText: PropTypes.string,
    sortByText: PropTypes.string,
    sort: PropTypes.string,
    totalResults: PropTypes.string,
    popularSortText: PropTypes.string,
    triggerSortByPopular: PropTypes.func,
    triggerSortByName: PropTypes.func,
};

SortByContainer.defaultProps = {
    ariaControlsId: '',
    displayResults: true,
    nameSortText: 'sort by name',
    sortingOptionsText: 'sortingOptions',
    resultsText: 'results',
    sortByText: 'sort by',
    sort: 'name',
    totalResults: 'total',
    popularSortText: 'sort by popular',
    triggerSortByPopular: () => null,
    triggerSortByName: () => null,
};

export default SortByContainer;
