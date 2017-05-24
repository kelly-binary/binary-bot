import proposals from './';
import * as actions from '../../constants/actions';

describe('proposals reducer', () => {
    let state;
    it('proposals should be falsy', () => {
        expect((state = proposals(state, { type: actions.INVALID }))).toEqual([]);
    });
    it('UPDATE_PROPOSAL should add proposal', () => {
        expect((state = proposals(state, { type: actions.UPDATE_PROPOSAL, data: { contractType: 'CALL' } }))).toEqual([
            { contractType: 'CALL' },
        ]);
    });
    it('UPDATE_PROPOSAL should replace existing proposal', () => {
        expect(
            (state = proposals(state, { type: actions.UPDATE_PROPOSAL, data: { contractType: 'CALL', id: 'id' } }))
        ).toEqual([{ contractType: 'CALL', id: 'id' }]);
    });
    it('UPDATE_PROPOSAL should add a new proposal', () => {
        expect((state = proposals(state, { type: actions.UPDATE_PROPOSAL, data: { contractType: 'PUT' } }))).toEqual([
            { contractType: 'CALL', id: 'id' },
            { contractType: 'PUT' },
        ]);
    });
    it('UPDATE_PROPOSAL should update an existing new proposal', () => {
        expect(
            (state = proposals(state, { type: actions.UPDATE_PROPOSAL, data: { contractType: 'PUT', id: 'id2' } }))
        ).toEqual([{ contractType: 'CALL', id: 'id' }, { contractType: 'PUT', id: 'id2' }]);
    });
    it('RENEW_PROPOSALS should remove all proposals', () => {
        expect((state = proposals(state, { type: actions.RENEW_PROPOSALS }))).toEqual([]);
    });
});
