import { translate } from '../../../../common/i18n';
import * as actions from '../constants/actions';

export const throwUpdateWaitingForPurchase = () => ({
    type   : `${actions.UPDATE_WAITING_FOR_PURCHASE}_ERROR`,
    payload: Error(translate('Bot should be started before calling watch function')),
    error  : true,
});

export const updateWaitingForPurchase = (timestamp, stayInsideScope) => ({
    type   : actions.UPDATE_WAITING_FOR_PURCHASE,
    payload: { timestamp, stayInsideScope },
});
