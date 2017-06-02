const selectIn = arg => {
    const fields = [].concat(arg);

    return state => fields.reduce((obj, f) => obj[f], state);
};

export const stage = selectIn('stage');

export const tradeOption = selectIn('tradeOption');

export const lastTick = selectIn('lastTick');

export const proposals = selectIn(['proposalInfo', 'receivedProposals']);

export const forgottenProposals = selectIn(['proposalInfo', 'forgottenProposals']);

export const requestedProposals = selectIn(['proposalInfo', 'requestedProposals']);
