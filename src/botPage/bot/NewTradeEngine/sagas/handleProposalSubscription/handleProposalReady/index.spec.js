describe('handlePropsoalReady saga', () => {
    it('should wait for as much proposals as in request proposals', () => {
        testSaga(handlePropsoalReady)
            .next()
            .select(selectors.proposalRequestsSelector)
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
