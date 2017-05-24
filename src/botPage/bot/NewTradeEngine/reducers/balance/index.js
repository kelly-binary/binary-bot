import * as actions from '../../constants/actions';

const initialState = {
    balance : '',
    currency: '',
};

const init = (state = initialState, action) => {
    switch (action.type) {
        case actions.BALANCE_RECEIVED:
            return action.payload;
        default:
            return state;
    }
};

export default init;
