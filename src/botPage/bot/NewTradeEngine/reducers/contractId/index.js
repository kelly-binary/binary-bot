import * as actions from '../../constants/actions';

const contractId = (state = '', action) => {
    switch (action.type) {
        case actions.PURCHASE_SUCCESSFULLY:
            return action.data;
        default:
            return state;
    }
};

export default contractId;
