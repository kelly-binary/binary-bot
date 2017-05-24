import * as actions from '../../constants/actions';

const proposals = (state = [], action) => {
    switch (action.type) {
        case actions.UPDATE_PROPOSAL: {
            const { data: proposal } = action;
            const proposalIndex = state.findIndex(p => p.contractType === proposal.contractType);
            if (proposalIndex >= 0) {
                const newState = [...state];
                newState[proposalIndex] = proposal;
                return newState;
            }
            return [...state, proposal];
        }
        case actions.RENEW_PROPOSALS:
            return [];
        default:
            return state;
    }
};

export default proposals;
