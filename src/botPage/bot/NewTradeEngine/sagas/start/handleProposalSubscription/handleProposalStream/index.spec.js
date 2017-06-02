import { testSaga } from 'redux-saga-test-plan';
import { eventChannel } from 'redux-saga';
import * as actions from '../../../../constants/actions';
import * as selectors from '../../../selectors';
import handleProposalStream from './';

const fakeChannel = eventChannel(() => () => {});

const uuid = '1';
const proposal = {
    amount: 1,
};

const newProposalResponse = {
    passthrough: {
        uuid,
    },
    proposal,
};

const forgottenProposalResponse = {
    passthrough: {
        uuid: '2',
    },
    proposal,
};

const forgottenProposals = {
    '2': true,
    '3': true,
};

describe('handleProposalStream saga', () => {
    it('should wait for new data in the stream and call UPDATE_RECEIVED_PROPOSAL', () => {
        testSaga(handleProposalStream, fakeChannel)
            .next()
            .take(fakeChannel)
            .next(newProposalResponse)
            .select(selectors.forgottenProposals)
            .next(forgottenProposals)
            .put({ type: `UPDATE_${actions.RECEIVED_PROPOSAL}`, payload: { [uuid]: proposal } })
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
            .isDone();
    });
});
