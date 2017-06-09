import * as actions from '../../constants/actions';
import purchaseDone from './';

describe('purchaseDone action creator', () => {
    it('should return PURCHASE_DONE action for successful purchase', () => {
        expect(purchaseDone({ payload })).toEqual({
            type: actions.PURCHASE_DONE,
            payload,
        });
    });
    it('should return PURCHASE_DONE action for unsuccessful purchase', () => {
        expect(purchaseDone({ payload, error: true })).toEqual({
            type : actions.PURCHASE_DONE,
            payload,
            error: true,
        });
    });
});
