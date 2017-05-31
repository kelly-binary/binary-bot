import { combineReducers } from 'redux';
import * as actions from '../constants/actions';
import propertyReducer from './propertyReducer';

const requestedProposals = propertyReducer({}, actions.REQUEST_PROPOSAL);
const receivedProposals = propertyReducer({}, actions.RECEIVED_PROPOSAL);
const forgottenProposals = propertyReducer({}, actions.FORGET_PROPOSAL);

export default combineReducers({
    requestedProposals,
    receivedProposals,
    forgottenProposals,
});
