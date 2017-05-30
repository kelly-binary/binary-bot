import { takeEvery } from 'redux-saga/effects';
import * as actions from '../constants/actions';
import customTakeEvery from './customTakeEvery';
import error from './error';
import init from './init';
import start from './start';

export default function* rootSaga() {
    yield takeEvery('*', error);
    yield customTakeEvery(actions.INIT_SAGA, init);
    yield customTakeEvery(actions.START_SAGA, start);
}
