import * as actions from '../constants/actions';
import standardAction from './standardAction';

export const initialize = standardAction(actions.INITIALIZE);

export const start = standardAction(actions.START);

export const newTick = standardAction(actions.NEW_TICK);

export const stopBecauseOfError = standardAction(actions.STOP_BECAUSE_OF_ERROR);
