import * as actions from '../../constants/actions';

export default function start(payload) {
    return {
        type: actions.START,
        payload,
    };
}
