import { combineReducers } from 'redux';
import * as properties from '../constants/properties';
import itemReducerCreator from './itemReducerCreator';

const requestedProposals = itemReducerCreator({ itemName: properties.REQUESTED_PROPOSAL, object: true });
const receivedProposals = itemReducerCreator({ itemName: properties.RECEIVED_PROPOSAL, object: true });
const forgottenProposals = itemReducerCreator({ itemName: properties.FORGOTTEN_PROPOSAL, object: true });

export default combineReducers({
    requestedProposals,
    receivedProposals,
    forgottenProposals,
});
