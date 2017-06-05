import { testSaga } from 'redux-saga-test-plan';
import * as actions from '../../../../constants/actions';
import * as selectors from '../../../selectors';
import handleProposalReady from './';

const proposalRequests = {
    uuid1: true,
    uuid2: true,
};

const proposal3 = {
    payload: { uuid3: {} },
};
const proposal4 = {
    payload: { uuid4: {} },
};

const proposal1 = {
    payload: { uuid1: {} },
};
const proposal2 = {
    payload: { uuid2: {} },
};

describe('handleProposalReady saga', () => {
    it('should wait for as much proposals as in request proposals', () => {
        testSaga(handleProposalReady)
            .next()
            .select(selectors.requestedProposals)
            .next(proposalRequests)
            .take(`UPDATE_${actions.RECEIVED_PROPOSAL}`)
            .next(proposal3)
            .take(`UPDATE_${actions.RECEIVED_PROPOSAL}`)
            .next(proposal4)
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
