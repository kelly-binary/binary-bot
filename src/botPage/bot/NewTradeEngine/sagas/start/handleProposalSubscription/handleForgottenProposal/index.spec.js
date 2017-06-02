import { testSaga } from 'redux-saga-test-plan';
import * as actions from '../../../../constants/actions';
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
            .put({ type: `UPDATE_${actions.FORGOTTEN_PROPOSAL}`, payload })
            .next()
            .call([api, api.unsubscribeByID], proposal.id)
            .next()
            .put({ type: `REMOVE_${actions.FORGOTTEN_PROPOSAL}`, payload: proposalID })
            .next()
            .isDone();
    });
    it('should put FORGET_PROPOSAL_ERROR with the thrown error', () => {
        testSaga(handleForgottenProposal, arg)
            .next()
            .put({ type: `UPDATE_${actions.FORGOTTEN_PROPOSAL}`, payload })
            .next()
            .call([api, api.unsubscribeByID], proposal.id)
            .next()
            .throw(error)
            .put({ type: `${actions.FORGOTTEN_PROPOSAL}_ERROR`, payload: error, error: true })
            .next()
            .isDone();
    });
});
