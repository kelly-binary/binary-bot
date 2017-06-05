import { takeEvery } from 'redux-saga/effects';
import * as actions from '../constants/actions';
import customTakeEvery from './customTakeEvery';
import error from './error';
import init from './init';
import start from './start';
import waitForPurchase from './watch/waitForPurchase';
import waitForSell from './watch/waitForSell';

export default function* rootSaga() {
    yield takeEvery('*', error);
    yield customTakeEvery(actions.INIT_SAGA, init);
    yield customTakeEvery(actions.START_SAGA, start);
    yield customTakeEvery(actions.NEW_TICK, waitForPurchase);
    yield customTakeEvery(actions.RECEIVE_ALL_PROPOSALS, waitForPurchase);
    yield customTakeEvery(actions.OPEN_CONTRACT, waitForSell);
}
