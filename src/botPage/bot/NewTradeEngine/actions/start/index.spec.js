import * as actions from '../../constants/actions';
import start from './';

const payload = {};

describe('start action creator', () => {
    it('should return START action', () => {
        expect(start(payload)).toEqual({
            type: actions.START,
            payload,
        });
    });
});
