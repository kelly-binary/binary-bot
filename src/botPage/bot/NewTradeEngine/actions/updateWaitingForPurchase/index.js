import { translate } from '../../../../../common/i18n';
import * as actions from '../../constants/actions';

export default function({ timestamp, stayInsideScope, error }) {
    if (error) {
        return {
            type   : `${actions.UPDATE_WAITING_FOR_PURCHASE}_ERROR`,
            payload: Error(translate('Bot should be started before calling watch function')),
            error  : true,
        };
    }
    return {
        type   : actions.UPDATE_WAITING_FOR_PURCHASE,
        payload: { timestamp, stayInsideScope },
    };
}
