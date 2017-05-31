import { testSaga } from 'redux-saga-test-plan';
import * as actions from '../../constants/actions';
import handleForgottenProposals from './';

const proposalID = '123';
const payload = { [proposalID]: '' };
const api = {
    unsubscribeByID() {},
};
const $scope = { api };
const arg = { proposalID, $scope };
const error = new Error('ErrorName');
describe('handleForgottenProposals saga', () => {
    it('should dispatch forget proposal', () => {
        testSaga(handleForgottenProposals, arg)
            .next()
            .put({ type: `UPDATE_${actions.FORGOTTEN_PROPOSAL}`, payload })
            .next()
            .call([api, api.unsubscribeByID], proposalID)
            .next()
            .put({ type: `REMOVE_${actions.FORGOTTEN_PROPOSAL}`, payload: proposalID })
            .next()
            .isDone();
    });
    it('should put FORGET_PROPOSAL_ERROR with the thrown error', () => {
        testSaga(handleForgottenProposals, arg)
            .next()
            .put({ type: `UPDATE_${actions.FORGOTTEN_PROPOSAL}`, payload })
            .next()
            .call([api, api.unsubscribeByID], proposalID)
            .next()
            .throw(error)
            .put({ type: `${actions.FORGOTTEN_PROPOSAL}_ERROR`, payload: error, error: true })
            .next()
            .isDone();
    });
});
