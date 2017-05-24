import * as actions from '../../constants/actions';

const initData = (state = {}, action) => {
    switch (action.type) {
        case actions.INIT:
            return action.payload;
        default:
            return state;
    }
};

export default initData;
