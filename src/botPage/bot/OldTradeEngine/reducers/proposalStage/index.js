import * as states from '../../constants/states';
import * as actions from '../../constants/actions';

const proposalStage = (state = states.WAITING_FOR_TRADE_OPTION, action) => {
    switch (action.type) {
        case actions.REQUEST_ONE_PROPOSAL:
            return states.WAITING_FOR_ONE_PROPOSAL;
        case actions.REQUEST_TWO_PROPOSALS:
            return states.WAITING_FOR_TWO_PROPOSALS;
        case actions.UPDATE_PROPOSAL:
            if (state === states.WAITING_FOR_TWO_PROPOSALS) {
                return states.WAITING_FOR_ONE_MORE_PROPOSAL;
            }
            if (state === states.WAITING_FOR_ONE_MORE_PROPOSAL) {
                return states.TWO_PROPOSALS_RECEIVED;
            }
            if (state === states.TWO_PROPOSALS_RECEIVED) {
                return states.WAITING_FOR_ONE_MORE_PROPOSAL;
            }
            if (state === states.WAITING_FOR_ONE_PROPOSAL) {
                return states.ONE_PROPOSAL_RECEIVED;
            }
            return state;
        case actions.RENEW_PROPOSALS:
            if (state === states.ONE_PROPOSAL_RECEIVED) {
                return states.WAITING_FOR_ONE_PROPOSAL;
            }
            if (state === states.TWO_PROPOSALS_RECEIVED) {
                return states.WAITING_FOR_TWO_PROPOSALS;
            }
            return state;
        default:
            return state;
    }
};

export default proposalStage;
