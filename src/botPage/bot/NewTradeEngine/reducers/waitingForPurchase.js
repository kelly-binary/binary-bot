import * as properties from '../constants/properties';
import itemReducerCreator from './itemReducerCreator';

export default itemReducerCreator({
    defaultState: { timestamp: 0, stayInsideScope: false },
    itemName    : properties.WAITING_FOR_PURCHASE,
});
