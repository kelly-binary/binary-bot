import * as actions from '../../constants/actions';

export default function initialize(payload) {
    return {
        type: actions.INITIALIZE,
        payload,
    };
}
