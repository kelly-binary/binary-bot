import * as actions from '../constants/actions';
import propertyReducerCreator from './reducerCreators/property';

export default propertyReducerCreator({
    defaultState: { timestamp: 0, stayInsideScope: false },
    actionType  : actions.UPDATE_WAITING_FOR_PURCHASE,
});
