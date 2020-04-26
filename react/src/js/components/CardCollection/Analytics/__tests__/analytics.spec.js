import sinon from 'sinon';
import sendAnalytics from '../analytics';

import * as DigitalDataLib from '@dexter/dexterui-tools/lib/analytics/digitalData';


describe('the sendAnalytics function', () => {
    it('calls the correct methods on digitaldata with the correct arguments', () => {
        sinon.spy(DigitalDataLib, 'default', () => ({
            setAssetInfo: sinon.spy(),
            setFilterInfo: sinon.spy(),
            sendEventAndTrigger: sinon.spy(),
        }));
        sendAnalytics('label', 'type');
        expect(DigitalDataLib.default.setAssetInfo.calledOnce).toBe(true);
        expect(DigitalDataLib.default.setFilterInfo.calledOnce).toBe(true);
        expect(DigitalDataLib.default.sendEventAndTrigger.calledWith('label', 'type')).toBe(true);
    });
});
