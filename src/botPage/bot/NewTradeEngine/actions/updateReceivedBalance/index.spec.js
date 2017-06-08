import * as actions from '../../constants/actions';
import updateReceivedBalance from './';

const success = {};
const error = Error({});

describe('updateReceivedBalance action creator', () => {
    it('should handle successful received balance', () => {
        expect(updateReceivedBalance({ type: actions.UPDATE_RECEIVED_BALANCE, payload: success }));
    });
    it('should handle error receiving balance', () => {
        expect(updateReceivedBalance({ type: actions.UPDATE_RECEIVED_BALANCE, payload: error, error: true }));
    });
});
