import * as actions from '../../../constants/actions';

const requestProposals = (state = {}, action) => {
    switch (action.type) {
        case actions.REQUEST_PROPOSAL:
            return action.payload;
        default:
            return state;
    }
};

export default requestProposals;
