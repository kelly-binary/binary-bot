import initData from './';
import * as actions from '../../constants/actions';

describe('initData reducer', () => {
    let state;
    it('initData should be empty', () => {
        expect((state = initData(state, { type: actions.INVALID }))).toEqual({});
    });
    it('INIT should set initData', () => {
        expect((state = initData(state, { type: actions.INIT, payload: { someData: true } }))).toEqual({
            someData: true,
        });
    });
});
