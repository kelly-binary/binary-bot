import * as actions from '../../constants/actions';

const lastTick = (state = 0, action) => {
    switch (action.type) {
        case actions.NEW_TICK:
            return action.payload.lastTick;
        default:
            return state;
    }
};

export default lastTick;
