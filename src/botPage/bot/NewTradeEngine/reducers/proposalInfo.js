import { combineReducers } from 'redux';
import * as actions from '../constants/actions';
import objectReducerCreator from './reducerCreators/object';

const requestedProposals = objectReducerCreator(actions.REQUESTED_PROPOSAL);
const receivedProposals = objectReducerCreator(actions.RECEIVED_PROPOSAL);
const forgottenProposals = objectReducerCreator(actions.FORGOTTEN_PROPOSAL);

export default combineReducers({
    requestedProposals,
    receivedProposals,
    forgottenProposals,
});
