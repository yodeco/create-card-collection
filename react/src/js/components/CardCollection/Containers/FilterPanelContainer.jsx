import React from 'react';
import PropTypes from 'prop-types';
import { store as newStore } from '../index';
import * as actions from '../Actions/index';
import FilterGroup from '../Components/FilterPanel/filterGroup';

class FilterPanelContainer extends React.Component {
    constructor(props) {
        super(props);
        this.getShowActiveFilters = this.getShowActiveFilters.bind(this);
        this.clearActiveFilters = this.clearActiveFilters.bind(this);
        this.getNameId = this.getNameId.bind(this);
        this.getFormattedId = this.getFormattedId.bind(this);
        this.capitalizeFirstLetter = this.capitalizeFirstLetter.bind(this);
        this.getFilterItem = this.getFilterItem.bind(this);
        this.toggleItem = this.toggleItem.bind(this);
        this.removeActiveFilter = this.removeActiveFilter.bind(this);
        this.toggleGroup = this.toggleGroup.bind(this);
        this.getFilterGroup = this.getFilterGroup.bind(this);
        this.isGroupOpen = this.isGroupOpen.bind(this);
        this.filterGroupKeyDownHandler = this.filterGroupKeyDownHandler.bind(this);
        this.filterItemKeyDownHandler = this.filterItemKeyDownHandler.bind(this);
        this.getFilterItemFromStoreById = this.getFilterItemFromStoreById.bind(this);
        this.getFilterItemFromStoreByIndex = this.getFilterItemFromStoreByIndex.bind(this);
    }

    getShowActiveFilters() {
        const activeFilters = this.getActiveFilters();
        return activeFilters.length > 0;
    }

    getActiveFilters() {
        const { filterItems } = newStore.getState().filterPanel;
        return filterItems.filter(item => item.checked);
    }

    /**
     *  Utility method to get parent div id.
     */

    getNameId(title) {
        return title.replace(/\s/g, '').toLowerCase();
    }

    getParentId(title) {
        return `tag-List_Group-${this.getNameId(title)}`;
    }

    getParentFilterItemId(title) {
        return `tag-List_Group-tags-${this.getNameId(title)}`;
    }

    getDomId(category) {
        return this.getParentId(category);
    }

    getFormattedId(id) {
        return id.replace(/\W+/g, '-');
    }

    getFilterItemFromStoreById(id) {
        return newStore.getState()
            .filterPanel.filterItems.filter(item => item.id === id).pop();
    }

    getFilterItemFromStoreByIndex(index) {
        return newStore.getState()
            .filterPanel.filterItems.filter(item => item.index === index).pop();
    }

    getFirstFilterItem(el) {
        return el.firstElementChild.firstChild;
    }

    getLastFilterItem(el) {
        return el.lastElementChild.firstChild;
    }

    getFilterGroup(id) {
        return newStore.getState().filterPanel.filterGroups[id];
    }

    getHtmlElement(id) {
        return document.getElementById(id);
    }

    getFilterItems(filterGroup) {
        const { filterItems } = newStore.getState().filterPanel;
        return filterItems
            .filter(item => item.category === this.capitalizeFirstLetter(filterGroup));
    }

    getFilterItem(id) {
        const { filterItems } = newStore.getState().filterPanel;
        const filterItem = filterItems.filter(item => item.id === id);
        return filterItem.pop();
    }

    getTheFilterGroup(index) {
        const { filterGroups } = newStore.getState().filterPanel;
        if (filterGroups.length > 0) {
            return filterGroups[index];
        }
        return null;
    }

    capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    toggleItem(id) {
        const filterItem = this.getFilterItem(id);

        if (filterItem.checked === true) {
            newStore.dispatch(actions.removeFilter(id));
            this.props.updateCards();
            return;
        }
        if (filterItem.checked === false) {
            newStore.dispatch(actions.addFilter(id));
            this.props.updateCards();
        }
    }

    toggleGroup(id) {
        newStore.dispatch(actions.toggleGroup(id));
    }

    openGroup(id) {
        newStore.dispatch(actions.openFilterGroup(id));
    }

    closeGroup(id) {
        newStore.dispatch(actions.closeFilterGroup(id));
    }

    isGroupOpen(index) {
        const filterGroup = this.getTheFilterGroup(index);
        if (filterGroup != null) {
            return filterGroup.isOpen;
        }
        return false;
    }

    removeActiveFilter(id) {
        newStore.dispatch(actions.removeFilter(id));
        this.props.updateCards();
    }

    focusHtmlElement(el) {
        el.focus();
    }

    filterItemKeyDownHandler(e, id, index) {
        if (e.key === 'Enter') {
            this.toggleItem(id);
            e.preventDefault();
        }
        if (e.key === 'ArrowLeft') {
            const filterItem = this.getFilterItemFromStoreById(id);
            if (filterItem != null) {
                const filterItemParentId = filterItem.parentId;
                const filterItemParentEl = this.getHtmlElement(filterItemParentId);
                this.focusHtmlElement(filterItemParentEl);
            }
        }

        if (e.key === 'ArrowDown') {
            const filterItem = this.getFilterItemFromStoreById(id);
            const filterIndex = filterItem.index;
            const nextFilterIndex = filterIndex + 1;
            const nextFilterItem = this.getFilterItemFromStoreByIndex(nextFilterIndex);

            if (nextFilterItem != null) {
                if (filterItem.category !== nextFilterItem.category) {
                    const domId = this.getDomId(nextFilterItem.category);
                    const filterGroupEl = this.getHtmlElement(domId);
                    this.focusHtmlElement(filterGroupEl);
                    e.preventDefault();
                    return;
                }

                const domId = this.getFormattedId(nextFilterItem.id);
                const nextFilterItemEl = this.getHtmlElement(domId);
                this.focusHtmlElement(nextFilterItemEl);
                e.preventDefault();
            }
        }
        if (e.key === 'ArrowUp') {
            const filterItem = this.getFilterItemFromStoreById(id);
            const filterIndex = filterItem.index;
            const previousFilterIndex = filterIndex - 1;
            const previousFilterItem = this.getFilterItemFromStoreByIndex(previousFilterIndex);

            if (index === 0) {
                const domId = this.getDomId(filterItem.category);
                const filterGroupEl = this.getHtmlElement(domId);
                this.focusHtmlElement(filterGroupEl);
                e.preventDefault();
                return;
            }

            if (previousFilterItem != null) {
                const domId = this.getFormattedId(previousFilterItem.id);
                const nextFilterItemEl = this.getHtmlElement(domId);
                this.focusHtmlElement(nextFilterItemEl);
                e.preventDefault();
            }
        }
    }

    clearActiveFilters() {
        newStore.dispatch(actions.clearActiveFilters());
        this.props.updateCards();
    }

    filterGroupKeyDownHandler(e, id) {
        if (e.key === 'Enter') {
            this.toggleGroup(id);
            e.preventDefault();
        }
        if (e.key === 'ArrowDown') {
            const currentFilterGroup = this.getFilterGroup(id);
            const nextFilterGroup = this.getFilterGroup(id + 1);
            if (currentFilterGroup != null && currentFilterGroup.isOpen) {
                const domId = this.getParentFilterItemId(currentFilterGroup.category);
                const filterTagGroupEl = this.getHtmlElement(domId);
                const firstFilterItem = this.getFirstFilterItem(filterTagGroupEl);
                this.focusHtmlElement(firstFilterItem);
                e.preventDefault();
                return;
            }
            if (nextFilterGroup != null) {
                const domId = this.getDomId(nextFilterGroup.category);
                const filterGroupEl = this.getHtmlElement(domId);
                this.focusHtmlElement(filterGroupEl);
                e.preventDefault();
            }
        }
        if (e.key === 'ArrowUp') {
            const previousFilterGroup = this.getFilterGroup(id - 1);
            const filterGroup = this.getFilterGroup(id - 1);
            if (filterGroup != null && !filterGroup.isOpen) {
                const domId = this.getDomId(filterGroup.category);
                const filterGroupEl = this.getHtmlElement(domId);
                this.focusHtmlElement(filterGroupEl);
                e.preventDefault();
                return;
            }
            if (previousFilterGroup != null && previousFilterGroup.isOpen) {
                const domId = this.getParentFilterItemId(previousFilterGroup.category);
                const filterGroupEl = this.getHtmlElement(domId);
                const lastFilterItem = this.getLastFilterItem(filterGroupEl);
                this.focusHtmlElement(lastFilterItem);
                e.preventDefault();
            }
        }
        if (e.key === 'ArrowLeft') {
            this.closeGroup(id);
        }

        if (e.key === 'ArrowRight') {
            this.openGroup(id);
        }
    }

    render() {
        const showHeadersClass = (this.props.showHeaders !== '') ? 'filters-show-headers' : '';
        const activeFilters = this.getActiveFilters();
        const tags = Object.keys(newStore.getState().filterPanel.tags);

        return (
            <dexter-filter-panel
                role="region"
                aria-label={this.props.searchFiltersLabel}
                className={showHeadersClass}>
                {this.getShowActiveFilters() &&
                <ul className="tag-List_active-FilterList">
                    {activeFilters.map(filter => (
                        <li key={filter.id}>
                            <button onClick={() => this.removeActiveFilter(filter.id)}>
                                {filter.title}
                            </button>
                        </li>))}
                </ul>}
                <header>
                    <h2>{this.props.filtersText}</h2>
                    {this.getShowActiveFilters() &&
                    <button
                        className="tag-List_Clear"
                        onClick={this.clearActiveFilters}>
                        {this.props.clearText}
                    </button>}
                </header>
                <section className="tag-List">
                    <ul>
                        {tags.map((tag, index) => (<FilterGroup
                            key={tag}
                            id={index}
                            isOpen={this.isGroupOpen(index)}
                            onFilterItemKeyDown={this.filterItemKeyDownHandler}
                            onFilterGroupKeyDown={this.filterGroupKeyDownHandler}
                            toggleGroup={this.toggleGroup}
                            toggleItem={this.toggleItem}
                            getFormattedId={this.getFormattedId}
                            name={this.capitalizeFirstLetter(tag)}
                            nameId={this.getNameId(tag)}
                            filterItems={this.getFilterItems(tag)} />), this)}
                    </ul>
                </section>
            </dexter-filter-panel>
        );
    }
}

FilterPanelContainer.propTypes = {
    updateCards: PropTypes.func,
    clearText: PropTypes.string,
    filtersText: PropTypes.string,
    searchFiltersLabel: PropTypes.string,
    showHeaders: PropTypes.string,
};

FilterPanelContainer.defaultProps = {
    updateCards: () => null,
    clearText: 'clearText',
    filtersText: 'filtersText',
    searchFiltersLabel: 'label',
    showHeaders: '',
};


export default FilterPanelContainer;
