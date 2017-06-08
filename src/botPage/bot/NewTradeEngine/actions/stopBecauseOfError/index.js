import * as actions from '../../constants/actions';

export default function stopBecauseOfError(payload) {
    return {
        type: actions.STOP_BECAUSE_OF_ERROR,
        payload,
    };
}
