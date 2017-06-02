import { testSaga } from 'redux-saga-test-plan';
import { eventChannel } from 'redux-saga';
import * as actions from '../../../constants/actions';
import * as selectors from '../../selectors';
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

const forgottenProposals = [
    {
        uuid: '2',
    },
    {
        uuid: '3',
    },
];

describe('handleProposalStream saga', () => {
    it('should wait for new data in the stream and call UPDATE_PROPOSAL', () => {
        testSaga(handleProposalStream, fakeChannel)
            .next()
            .take(fakeChannel)
            .next(newProposalResponse)
            .select(selectors.forgottenProposalsSelector)
            .next(forgottenProposals)
            .put({ type: `UPDATE_${actions.RECEIVED_PROPOSAL}`, payload: { [uuid]: proposal } })
            .next()
            .isDone();
    });
    it('should ignore the proposal which was already forgotten', () => {
        testSaga(handleProposalStream, fakeChannel)
            .next()
            .take(fakeChannel)
            .next(forgottenProposals[0])
            .select(selectors.forgottenProposalsSelector)
            .next(forgottenProposals)
            .isDone();
    });
});
