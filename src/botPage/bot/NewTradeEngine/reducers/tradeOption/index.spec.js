import tradeOption from './';
import * as actions from '../../constants/actions';

describe('tradeOption reducer', () => {
    let state;
    it('tradeOption should be empty', () => {
        expect((state = tradeOption(state, { type: actions.INVALID }))).toEqual({});
    });
    it('actions.START should set tradeOption', () => {
        expect((state = tradeOption(state, { type: actions.START, payload: { someData: true } }))).toEqual({
            someData: true,
        });
    });
});
