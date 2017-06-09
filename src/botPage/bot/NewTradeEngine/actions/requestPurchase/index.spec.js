import * as actions from '../../constants/actions';
import requestPurchase from './';

describe('requestPurchase action creator', () => {
    it('should return REQUEST_PURCHASE action', () => {
        expect(requestPurchase()).toEqual({
            type: actions.REQUEST_PURCHASE,
        });
    });
});
