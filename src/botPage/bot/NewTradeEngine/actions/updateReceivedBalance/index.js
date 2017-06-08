import * as actions from '../../constants/actions';

export default function updateReceivedBalance({ payload, error }) {
    if (error) {
        return {
            type : `${actions.UPDATE_RECEIVED_BALANCE}_ERROR`,
            payload,
            error: true,
        };
    }
    return {
        type: actions.UPDATE_RECEIVED_BALANCE,
        payload,
    };
}
