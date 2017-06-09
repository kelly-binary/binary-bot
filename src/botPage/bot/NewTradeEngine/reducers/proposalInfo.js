import { combineReducers } from 'redux';
import * as properties from '../constants/properties';
import objectReducerCreator from './reducerCreators/object';

const requestedProposals = objectReducerCreator(properties.REQUESTED_PROPOSAL);
const receivedProposals = objectReducerCreator(properties.RECEIVED_PROPOSAL);
const forgottenProposals = objectReducerCreator(properties.FORGOTTEN_PROPOSAL);

export default combineReducers({
    requestedProposals,
    receivedProposals,
    forgottenProposals,
});
