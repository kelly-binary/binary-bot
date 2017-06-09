import * as actions from '../constants/actions';
import itemReducerCreator from './itemReducerCreator';

export default itemReducerCreator({
    defaultState: { timestamp: 0, stayInsideScope: false },
    itemName    : actions.WAITING_FOR_PURCHASE,
});
