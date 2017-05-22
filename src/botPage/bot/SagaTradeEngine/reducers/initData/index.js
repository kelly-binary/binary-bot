import * as actions from '../../constants/actions';

const initData = (state = {}, action) => {
    switch (action.type) {
        case actions.INITIALIZE:
            return action.data;
        default:
            return state;
    }
};

export default initData;
