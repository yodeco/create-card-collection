export default {

    /**
     *  Utility method to get parent div id.
     */

    getNameId(title) {
        return title.replace(/\s/g, '').toLowerCase();
    },
    getParentId(title) {
        return `tag-List_Group-${this.getNameId(title)}`;
    },

    /**
     * Instead of using nested hierarchy for tags, and trying to build and manage the filter
     * panel that way, flattening this data structure makes it incredibly easy to maintain
     * and update the state of the filter Panel using reducers.
     *
     * @param tagGroups
     */

    setFilterItems(tagGroups) {
        const returnValue = [];
        let counter = 0;
        Object.keys(tagGroups).forEach((keyName) => {
            const { tags } = tagGroups[keyName];

            Object.keys(tags).forEach((tag) => {
                const obj = {};
                obj.title = tags[tag].title;
                obj.id = tags[tag].id;
                obj.checked = false;
                obj.category = tagGroups[keyName].title;
                obj.index = counter;

                obj.parentId = this.getParentId(obj.category);

                returnValue.push(obj);
                counter += 1;
            });
        });
        return returnValue;
    },

    setFilterGroups(tagGroups) {
        const returnValue = [];
        Object.keys(tagGroups).forEach((keyName) => {
            const obj = {};
            obj.category = tagGroups[keyName].title;
            obj.id = tagGroups[keyName].id;
            obj.isOpen = false;
            returnValue.push(obj);
        });
        return returnValue;
    },
    toggleFilterGroup(allFilterGroups, id) {
        const newState = allFilterGroups.map((item, index) => {
            if (index === id) {
                let rObj = {};
                rObj = item;
                rObj.isOpen = !rObj.isOpen;
                return rObj;
            }
            return item;
        });

        return newState;
    },
    openFilterGroup(allFilterGroups, id) {
        const newState = allFilterGroups.map((item, index) => {
            if (index === id) {
                let rObj = {};
                rObj = item;
                rObj.isOpen = true;
                return rObj;
            }
            return item;
        });

        return newState;
    },
    closeFilterGroup(allFilterGroups, id) {
        const newState = allFilterGroups.map((item, index) => {
            if (index === id) {
                let rObj = {};
                rObj = item;
                rObj.isOpen = false;
                return rObj;
            }
            return item;
        });

        return newState;
    },
    removeFilter(allFilterItems, id) {
        const newState = allFilterItems.map((item) => {
            if (item.id === id) {
                let rObj = {};
                rObj = item;
                rObj.checked = false;
                return rObj;
            }
            return item;
        });

        return newState;
    },
    removeAllFilters(allFilterItems) {
        const newState = allFilterItems.map((item) => {
            let rObj = {};
            rObj = item;
            rObj.checked = false;
            return rObj;
        });

        return newState;
    },
    addFilter(allFilterItems, id) {
        const newState = allFilterItems.map((item) => {
            if (item.id === id) {
                let rObj = {};
                rObj = item;
                rObj.checked = true;
                return rObj;
            }
            return item;
        });

        return newState;
    },
    setTags(tags) {
        return tags;
    }
}
