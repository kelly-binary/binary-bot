import proposalStage from './';
import * as states from '../../constants/states';
import * as actions from '../../constants/actions';
import action from '../actionCreator';

describe('Proposal Reducer', () => {
    let state;
    it('Initial state', () => {
        expect((state = proposalStage(state, action(actions.INVALID)))).toEqual(states.WAITING_FOR_TRADE_OPTION);
    });
    it('REQUEST_ONE_PROPOSAL request', () => {
        expect((state = proposalStage(state, action(actions.REQUEST_ONE_PROPOSAL)))).toEqual(
            states.WAITING_FOR_ONE_PROPOSAL
        );
    });
    it('UPDATE_PROPOSAL go to ONE_PROPOSAL_RECEIVED', () => {
        expect(proposalStage(state, action(actions.UPDATE_PROPOSAL))).toEqual(states.ONE_PROPOSAL_RECEIVED);
    });
    it('UPDATE_PROPOSAL go to ONE_PROPOSAL_RECEIVED', () => {
        expect(proposalStage(state, action(actions.UPDATE_PROPOSAL))).toEqual(states.ONE_PROPOSAL_RECEIVED);
    });
    it('REQUEST_TWO_PROPOSALS request', () => {
        expect((state = proposalStage(states.WAITING_FOR_TRADE_OPTION, action(actions.REQUEST_TWO_PROPOSALS)))).toEqual(
            states.WAITING_FOR_TWO_PROPOSALS
        );
    });
    it('One UPDATE_PROPOSAL when waiting for two', () => {
        expect((state = proposalStage(state, action(actions.UPDATE_PROPOSAL)))).toEqual(
            states.WAITING_FOR_ONE_MORE_PROPOSAL
        );
    });
    it('Another UPDATE_PROPOSAL when waiting for one', () => {
        expect((state = proposalStage(state, action(actions.UPDATE_PROPOSAL)))).toEqual(states.TWO_PROPOSALS_RECEIVED);
    });
    it('One UPDATE_PROPOSAL when all proposals were received', () => {
        expect((state = proposalStage(state, action(actions.UPDATE_PROPOSAL)))).toEqual(
            states.WAITING_FOR_ONE_MORE_PROPOSAL
        );
    });
    it('RENEW_PROPOSALS from TWO_PROPOSALS_RECEIVED should go to WAITING_FOR_TWO_PROPOSALS', () => {
        expect(proposalStage(states.TWO_PROPOSALS_RECEIVED, action(actions.RENEW_PROPOSALS))).toEqual(
            states.WAITING_FOR_TWO_PROPOSALS
        );
    });
    it('RENEW_PROPOSALS from ONE_PROPOSAL_RECEIVED should go to WAITING_FOR_ONE_PROPOSAL', () => {
        expect(proposalStage(states.ONE_PROPOSAL_RECEIVED, action(actions.RENEW_PROPOSALS))).toEqual(
            states.WAITING_FOR_ONE_PROPOSAL
        );
    });
});
