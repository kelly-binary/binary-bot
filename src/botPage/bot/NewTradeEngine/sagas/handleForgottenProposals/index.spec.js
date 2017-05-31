import { testSaga } from 'redux-saga-test-plan';
import * as actions from '../../constants/actions';
import handleForgottenProposals from './';

const proposalID = '123';
const payload = { [proposalID]: undefined };
const api = {
    unsubscribeByID() {},
};

describe('handleForgottenProposals saga', () => {
    it('should dispatch forget proposal', () => {
        testSaga(handleForgottenProposals, proposalID)
            .next()
            .put({ type: `UPDATE_${actions.FORGOTTEN_PROPOSAL}`, payload })
            .next()
            .call([api, api.unsubscribeByID], proposalID)
            .next()
            .put({ type: `REMOVE_${actions.FORGOTTEN_PROPOSAL}`, payload: proposalID })
            .isDone();
    });
});
