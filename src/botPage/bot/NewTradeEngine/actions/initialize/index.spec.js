import * as actions from '../../constants/actions';
import initialize from './';

const payload = {};

describe('initialize action creator', () => {
    it('should return INITIALIZE action', () => {
        expect(initialize(payload)).toEqual({
            type: actions.INITIALIZE,
            payload,
        });
    });
});
