describe('start and proposal subscription integration', () => {
    expect()
        .put({ type: `UPDATE_${actions.RECEIVED_PROPOSAL}` })
        .put({ type: `UPDATE_${actions.RECEIVED_PROPOSAL}` })
        .put({ type: `UPDATE_${actions.REQUESTED_PROPOSAL}` })
        .put({ type: `UPDATE_${actions.REQUESTED_PROPOSAL}` })
        .put({ type: `UPDATE_${actions.REQUESTED_PROPOSAL}` })
        .put({ type: `UPDATE_${actions.REQUESTED_PROPOSAL}` });
});
