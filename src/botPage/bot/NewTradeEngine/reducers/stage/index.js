import * as states from '../../constants/states';
import * as actions from '../../constants/actions';

const initialState = states.STOPPED;

const stage = (state = initialState, action) => {
    switch (action.type) {
        case actions.STOP_BECAUSE_OF_ERROR:
            return states.STOPPED;
        case actions.SELL_SUCCESSFULLY:
        case actions.INITIALIZE:
            return states.INITIALIZED;
        case actions.START:
        case actions.PURCHASE_UNSUCCESSFULLY:
            return states.STARTED;
        case actions.RECEIVE_ALL_PROPOSALS:
            return states.PROPOSALS_READY;
        case actions.REQUEST_PURCHASE:
            return states.PURCHASING;
        case actions.PURCHASE_SUCCESSFULLY:
            return states.SUCCESSFUL_PURCHASE;
        case actions.RECEIVE_OPEN_CONTRACT:
            return states.OPEN_CONTRACT;
        default:
            return state;
    }
};

export default stage;
