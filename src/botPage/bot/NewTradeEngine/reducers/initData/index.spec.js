import initData from './';
import * as actions from '../../constants/actions';

describe('initData reducer', () => {
    let state;
    it('initData should be empty', () => {
        expect((state = initData(state, { type: actions.INVALID }))).toEqual({});
    });
    it('INITIALIZE should set initData', () => {
        expect((state = initData(state, { type: actions.INITIALIZE, payload: { someData: true } }))).toEqual({
            someData: true,
        });
    });
});
