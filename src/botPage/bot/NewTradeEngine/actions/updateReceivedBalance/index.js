import * as actions from '../../constants/actions';

export default function updateReceivedBalance({ payload, error }) {
    if (error) {
        return {
            type : actions.UPDATE_RECEIVED_BALANCE,
            payload,
            error: true,
        };
    }
    return {
        type: actions.UPDATE_RECEIVED_BALANCE,
        payload,
    };
}
