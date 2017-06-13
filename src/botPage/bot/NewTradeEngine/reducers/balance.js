import * as properties from '../constants/properties';
import itemReducerCreator from './itemReducerCreator';

export default itemReducerCreator({
    defaultState: { balance: '', currency: '' },
    itemName    : properties.RECEIVED_BALANCE,
});
