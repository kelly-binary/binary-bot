import * as actions from '../../constants/actions';

export default function newTick(payload) {
    return {
        type: actions.NEW_TICK,
        payload,
    };
}
