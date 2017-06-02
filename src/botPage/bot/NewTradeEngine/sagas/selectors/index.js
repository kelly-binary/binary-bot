export const stageSelector = ({ stage }) => stage;

export const tradeOptionSelector = ({ tradeOption }) => tradeOption;

export const lastTickSelector = ({ lastTick }) => lastTick;

export const proposalsSelector = ({ proposalInfo: { receivedProposals } }) => receivedProposals;

export const forgottenProposalsSelector = ({ proposalInfo: { forgottenProposals } }) => forgottenProposals;
