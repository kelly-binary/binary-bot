import { testSaga } from 'redux-saga-test-plan';
import * as actions from '../../constants/actions';
import handleForgottenProposals from './';

const proposalID = '123';
const api = {
    unsubscribeByID() {},
};

describe('handleForgottenProposals saga', () => {
    it('should dispatch forget proposal', () => {
        testSaga(handleForgottenProposals, proposalID)
            .next()
            .put({ type: actions.FORGET_PROPOSAL, payload: proposalID })
            .next()
            .call([api, api.unsubscribeByID], proposalID)
            .next()
            .isDone();
    });
});
