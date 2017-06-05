import { takeEvery } from 'redux-saga/effects';
import * as actions from '../constants/actions';
import customTakeEvery from './customTakeEvery';
import error from './error';
import init from './init';
import start from './start';
import newTickWatcher from './watchers/newTickWatcher';
import receiveProposalsWatcher from './watcher/receiveProposalsWatcher';
import openContractWatcher from './watcher/openContractWatcher';

export default function* rootSaga() {
    yield takeEvery('*', error);
    yield customTakeEvery(actions.INIT_SAGA, init);
    yield customTakeEvery(actions.START_SAGA, start);
    yield customTakeEvery(actions.NEW_TICK, newTickWatcher);
    yield customTakeEvery(actions.RECEIVE_ALL_PROPOSALS, receiveProposalsWatcher);
    yield customTakeEvery(actions.OPEN_CONTRACT, openContractWatcher);
}
