import contractId from './';
import * as actions from '../../constants/actions';

describe('contractId reducer', () => {
    let state;
    it('contractId should be falsy', () => {
        expect((state = contractId(state, { type: actions.INVALID }))).toEqual('');
    });
    it('PURCHASE_SUCCESSFULLY should set contractId', () => {
        expect((state = contractId(state, { type: actions.PURCHASE_SUCCESSFULLY, payload: 'contractId' }))).toEqual(
            'contractId'
        );
    });
});
