export function getActiveFilterNames(activeFilters) {
    const filterMap = new Map();
    activeFilters.forEach((filter) => {
        if (typeof filterMap.get(filter.category) !== 'undefined') {
        const filterValue = filterMap.get(filter.category);
        filterMap.set(filter.category, `${filterValue},${filter.title}`);
    } else {
        filterMap.set(filter.category, filter.title);
    }
});

    let filterNames = '';
    filterMap.forEach((value, key) => {
        filterNames += `${key}:${value}|`;
});

    return filterNames.slice(0, -1);
}

export function getFilterNames(filterItems) {
    /* eslint-disable */
    const panelItems = filterItems;
    const activeFilters = panelItems.filter(function(item){
        if (item.checked === true) {
            return item;
        }
    });

    return getActiveFilterNames(activeFilters);
    /* eslint-enable */
}
