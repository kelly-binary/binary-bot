import handleForgottenProposal from '../proposal/handleForgottenProposal';

const proposalID1 = 'proposalID1';
const proposalID2 = 'proposalID2';
const proposal1 = { id: '0' };
const proposal2 = { id: '1' };
const payload = { [proposalID1]: proposal1, [proposalID2]: proposal2 };

describe('handleProposalSubscription', () => {
    it('should request a new proposal and create a dataStream for proposals', () => {
        testSaga(handleProposalSubscription, { $scope, tradeOption })
            .next()
            .select(selectors.proposals)
            .next(payload)
            .fork(handleForgottenProposal, { $scope, proposalID: proposalID1 })
            .next()
            .fork(handleForgottenProposal, { $scope, proposalID: proposalID2 })
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
