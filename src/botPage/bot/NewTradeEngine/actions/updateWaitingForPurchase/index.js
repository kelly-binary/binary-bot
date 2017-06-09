import { translate } from '../../../../../common/i18n';
import { updatePropertyAction } from '../../tools';
import * as properties from '../../constants/properties';

export default function({ timestamp, stayInsideScope, error }) {
    if (error) {
        return {
            type   : updatePropertyAction(properties.WAITING_FOR_PURCHASE),
            payload: Error(translate('Bot should be started before calling watch function')),
            error  : true,
        };
    }
    return {
        type   : updatePropertyAction(properties.WAITING_FOR_PURCHASE),
        payload: { timestamp, stayInsideScope },
    };
}
