import contract from './';
import * as actions from '../../constants/actions';

describe('contract reducer', () => {
    let state;
    it('contract should be empty', () => {
        expect((state = contract(state, { type: actions.INVALID }))).toEqual({});
    });
    it('actions.RECEIVE_OPEN_CONTRACT should set contract', () => {
        expect(
            (state = contract(state, { type: actions.RECEIVE_OPEN_CONTRACT, payload: { id: 'oi1joi3ejoij' } }))
        ).toEqual({
            id: 'oi1joi3ejoij',
        });
    });
});
