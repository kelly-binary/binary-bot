import { eventChannel } from 'redux-saga';
import { testSaga } from 'redux-saga-test-plan';
import dataStream from '../dataStream';
import * as selectors from '../selectors';
import requestProposals from './requestProposals';
import handleProposalReady from './handleProposalReady';
import handleProposalStream from './handleProposalStream';
import handleForgottenProposal from './handleForgottenProposal';
import handleProposalSubscription from './';

const fakeChannel = eventChannel(() => () => {});
const tradeOption = {};
const $scope = {};
const proposalID1 = 'proposalID1';
const proposalID2 = 'proposalID2';
const proposal1 = { id: '0', uuid: proposalID1 };
const proposal2 = { id: '1', uuid: proposalID2 };
const payload = { [proposalID1]: proposal1, [proposalID2]: proposal2 };

describe('handleProposalSubscription', () => {
    it('should request a new proposal and create a dataStream for proposals', () => {
        testSaga(handleProposalSubscription, { $scope, tradeOption })
            .next()
            .select(selectors.receivedProposals)
            .next(payload)
            .fork(handleForgottenProposal, { $scope, proposal: proposal1 })
            .next()
            .fork(handleForgottenProposal, { $scope, proposal: proposal2 })
            .next()
            .fork(requestProposals, tradeOption)
            .next()
            .call(dataStream, { type: 'proposal', $scope })
            .next(fakeChannel)
            .fork(handleProposalStream, fakeChannel)
            .fork(handleProposalReady)
            .next()
            .isDone();
    });
});
