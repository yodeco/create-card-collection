import DigitalData from '@dexter/dexterui-tools/lib/analytics/digitalData';
import { store } from '../index';
import { getFilterNames } from './helperMethods';

export default function sendAnalytics(eventLabel, eventType) {
    // eslint-disable-next-line
    let digitalData = {
        assetInfo: {
            asset: store.getState().cardCollection.asset,
            displayedAssets: store.getState().cardCollection.displayedAssets,
            totalAssets: store.getState().cardCollection.totalResults,
        },
        eventInfo: {
            eventLabel,
            eventType,
        },
        filterInfo: {
            filterName: getFilterNames(store.getState().filterPanel.filterItems),
            pageNumber: store.getState().pagination.currentPage,
            sortType: store.getState().sortBy.sortedBy,
            totalPages: store.getState().pagination.numberOfPages,
        },
    };

    //DigitalData.setAssetInfo(digitalData.assetInfo);
    //DigitalData.setFilterInfo(digitalData.filterInfo);
    //DigitalData.sendEventAndTrigger(eventLabel, eventType);
}
