import lastTick from './';
import * as actions from '../../constants/actions';

describe('lastTick reducer', () => {
    let state;
    it('lastTick should be 0', () => {
        expect((state = lastTick(state, { type: actions.INVALID }))).toEqual(0);
    });
    it('NEW_TICK should set lastTick to a number', () => {
        expect((state = lastTick(state, { type: actions.NEW_TICK, data: new Date().getTime() }))).toEqual(
            expect.any(Number)
        );
    });
});
