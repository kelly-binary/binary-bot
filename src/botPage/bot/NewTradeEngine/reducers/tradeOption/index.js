import * as actions from '../../constants/actions';

const tradeOption = (state = {}, action) => {
    switch (action.type) {
        case actions.START:
            return action.data;
        default:
            return state;
    }
};

export default tradeOption;
