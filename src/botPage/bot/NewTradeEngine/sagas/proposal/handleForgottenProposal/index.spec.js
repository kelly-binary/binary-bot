import { testSaga } from 'redux-saga-test-plan';
import * as properties from '../../../constants/properties';
import proposalInfo from '../../../actions/proposalInfo';
import handleForgottenProposal from './';

const proposalID = '123';
const api = {
    unsubscribeByID() {},
};
const $scope = { api };
const proposal = {
    uuid: proposalID,
    id  : '0123456',
};
const payload = { [proposalID]: '' };
const arg = { proposal, $scope };
const error = new Error('ErrorName');

describe('handleForgottenProposal saga', () => {
    it('should dispatch forget proposal', () => {
        testSaga(handleForgottenProposal, arg)
            .next()
            .put(proposalInfo({ itemName: properties.RECEIVED_PROPOSAL, payload: proposalID, meta: { remove: true } }))
            .next()
            .put(proposalInfo({ itemName: properties.REQUESTED_PROPOSAL, payload: proposalID, meta: { remove: true } }))
            .next()
            .put(proposalInfo({ itemName: properties.FORGOTTEN_PROPOSAL, payload }))
            .next()
            .call([api, api.unsubscribeByID], proposal.id)
            .next()
            .put(proposalInfo({ itemName: properties.FORGOTTEN_PROPOSAL, payload: proposalID, meta: { remove: true } }))
            .next()
            .isDone();
    });
    it('should put FORGET_PROPOSAL_ERROR with the thrown error', () => {
        testSaga(handleForgottenProposal, arg)
            .next()
            .put(proposalInfo({ itemName: properties.RECEIVED_PROPOSAL, payload: proposalID, meta: { remove: true } }))
            .next()
            .put(proposalInfo({ itemName: properties.REQUESTED_PROPOSAL, payload: proposalID, meta: { remove: true } }))
            .next()
            .put(proposalInfo({ itemName: properties.FORGOTTEN_PROPOSAL, payload }))
            .next()
            .call([api, api.unsubscribeByID], proposal.id)
            .next()
            .throw(error)
            .put(proposalInfo({ itemName: properties.FORGOTTEN_PROPOSAL, payload: error, error: true }))
            .next()
            .isDone();
    });
});
