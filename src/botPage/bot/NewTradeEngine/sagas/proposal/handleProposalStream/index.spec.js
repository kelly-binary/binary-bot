import { testSaga } from 'redux-saga-test-plan';
import { eventChannel } from 'redux-saga';
import * as actions from '../../../constants/actions';
import * as selectors from '../../selectors';
import handleProposalStream from './';

const fakeChannel = eventChannel(() => () => {});

const uuid1 = 'uuid1';
const uuid2 = 'uuid2';

const proposal = {
    amount: 1,
};

const passthrough = {
    uuid        : uuid1,
    contractType: 'CALL',
};

const expectedProposal = { ...proposal, ...passthrough };

const proposalResponse1 = {
    passthrough,
    proposal,
};

const forgottenProposalResponse = {
    passthrough: {
        uuid: uuid2,
    },
    proposal,
};

const forgottenProposals = {
    [uuid2]: true,
    uuid3  : true,
};

describe('handleProposalStream saga', () => {
    it('should wait for new data in the stream and call UPDATE_RECEIVED_PROPOSAL', () => {
        testSaga(handleProposalStream, fakeChannel)
            .next()
            .take(fakeChannel)
            .next(proposalResponse1)
            .select(selectors.forgottenProposals)
            .next(forgottenProposals)
            .put({ type: updatePropertyAction(actions.RECEIVED_PROPOSAL), payload: { [uuid1]: expectedProposal } })
            .next()
            .take(fakeChannel)
            .next(proposalResponse1)
            .select(selectors.forgottenProposals)
            .next(forgottenProposals)
            .put({ type: updatePropertyAction(actions.RECEIVED_PROPOSAL), payload: { [uuid1]: expectedProposal } })
            .next()
            .take(fakeChannel)
            .next()
            .isDone();
    });
    it('should ignore the proposal which was already forgotten', () => {
        testSaga(handleProposalStream, fakeChannel)
            .next()
            .take(fakeChannel)
            .next(forgottenProposalResponse)
            .select(selectors.forgottenProposals)
            .next(forgottenProposals)
            .take(fakeChannel)
            .next()
            .isDone();
    });
});
