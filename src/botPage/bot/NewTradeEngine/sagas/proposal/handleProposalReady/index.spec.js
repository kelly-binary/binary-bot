import { testSaga } from 'redux-saga-test-plan';
import receiveAllProposals from '../../../actions/receiveAllProposals';
import * as properties from '../../../constants/properties';
import { updatePropertyAction } from '../../../tools';
import * as selectors from '../../selectors';
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
            .take(updatePropertyAction(properties.RECEIVED_PROPOSAL))
            .next(proposal3)
            .take(updatePropertyAction(properties.RECEIVED_PROPOSAL))
            .next(proposal4)
            .take(updatePropertyAction(properties.RECEIVED_PROPOSAL))
            .next(proposal1)
            .take(updatePropertyAction(properties.RECEIVED_PROPOSAL))
            .next(proposal1)
            .take(updatePropertyAction(properties.RECEIVED_PROPOSAL))
            .next(proposal2)
            .put(receiveAllProposals())
            .next()
            .isDone();
    });
});
