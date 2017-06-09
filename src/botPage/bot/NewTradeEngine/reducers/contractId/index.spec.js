import contractId from './';
import * as actions from '../../constants/actions';

describe('contractId reducer', () => {
    let state;
    it('contractId should be falsy', () => {
        expect((state = contractId(state, { type: actions.INVALID }))).toEqual('');
    });
    it('PURCHASE_DONE should set contractId', () => {
        expect((state = contractId(state, { type: actions.PURCHASE_DONE, payload: 'contractID' }))).toEqual(
            'contractID'
        );
    });
});
