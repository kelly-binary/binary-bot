import * as properties from '../../constants/properties';
import { updatePropertyAction } from '../../tools';

export default function updateReceivedBalance({ payload, error }) {
    if (error) {
        return {
            type : updatePropertyAction(properties.RECEIVED_BALANCE),
            payload,
            error: true,
        };
    }
    return {
        type: updatePropertyAction(properties.RECEIVED_BALANCE),
        payload,
    };
}
