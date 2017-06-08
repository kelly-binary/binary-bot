import * as actions from '../../constants/actions';

const initialState = {
    balance : '',
    currency: '',
};

const init = (state = initialState, action) => {
    switch (action.type) {
        case actions.UPDATE_RECEIVED_BALANCE:
            return action.payload;
        default:
            return state;
    }
};

export default init;
