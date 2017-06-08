import * as actions from '../../constants/actions';
import newTick from './';

const payload = '';

describe('newTick action creator', () => {
    it('should return NEW_TICK action', () => {
        expect(newTick(payload)).toEqual({
            type: actions.NEW_TICK,
            payload,
        });
    });
});
