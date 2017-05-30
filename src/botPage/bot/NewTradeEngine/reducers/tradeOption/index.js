import * as actions from '../../constants/actions';

const tradeOption = (state = {}, action) => {
    switch (action.type) {
        case actions.START:
            return action.payload;
        default:
            return state;
    }
};

export default tradeOption;
