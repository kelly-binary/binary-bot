describe('Purchase saga', () => {
    it('should select a proposal using the contract type and purchase it', () => {
        testSaga(purchase, contractType).next().select(selectors.receivedProposals).next(selectedProposal).isDone();
    });
});
