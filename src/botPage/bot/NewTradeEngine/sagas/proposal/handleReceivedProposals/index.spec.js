import { testSaga } from 'redux-saga-test-plan';
import * as actions from '../../constants/actions';
import handleReceivedProposals from './';

const proposal = {};

describe('handleReceivedProposals saga', () => {
    it('should receives one proposal', () => {
        testSaga(handleReceivedProposals, proposal)
            .next()
            .put({ type: actions.RECEIVE_PROPOSAL, payload: proposal })
            .next()
            .isDone();
    });
});
