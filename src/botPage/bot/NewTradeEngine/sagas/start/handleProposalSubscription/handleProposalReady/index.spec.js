import { testSaga } from 'redux-saga-test-plan';
import * as actions from '../../../../constants/actions';
import * as selectors from '../../../selectors';
import handleProposalReady from './';

const proposalRequests = {
    1: {},
    2: {},
};

const proposal1 = {
    uuid: '1',
};
const proposal2 = {
    uuid: '2',
};

describe('handleProposalReady saga', () => {
    it('should wait for as much proposals as in request proposals', () => {
        testSaga(handleProposalReady)
            .next()
            .select(selectors.requestedProposals)
            .next(proposalRequests)
            .take(`UPDATE_${actions.RECEIVED_PROPOSAL}`)
            .next(proposal1)
            .take(`UPDATE_${actions.RECEIVED_PROPOSAL}`)
            .next(proposal1)
            .take(`UPDATE_${actions.RECEIVED_PROPOSAL}`)
            .next(proposal2)
            .put({ type: actions.RECEIVE_ALL_PROPOSALS })
            .next()
            .isDone();
    });
});
