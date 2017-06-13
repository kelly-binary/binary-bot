import * as properties from '../../constants/properties';
import { updatePropertyAction } from '../../tools';
import updateReceivedBalance from './';

const success = {};
const error = Error({});

describe('updateReceivedBalance action creator', () => {
    it('should handle successful received balance', () => {
        expect(updateReceivedBalance({ payload: success })).toEqual({
            type   : updatePropertyAction(properties.RECEIVED_BALANCE),
            payload: success,
        });
    });
    it('should handle error receiving balance', () => {
        expect(updateReceivedBalance({ payload: error, error: true })).toEqual({
            type   : updatePropertyAction(properties.RECEIVED_BALANCE),
            payload: error,
            error  : true,
        });
    });
});
