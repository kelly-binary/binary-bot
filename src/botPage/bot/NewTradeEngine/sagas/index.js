import { takeEvery } from 'redux-saga/effects';
import * as actions from '../constants/actions';
import customTakeEvery from './customTakeEvery';
import error from './error';
import init from './init';

export default function* rootSaga() {
    yield takeEvery('*', error);
    yield customTakeEvery(actions.INIT_SAGA, init);
}
