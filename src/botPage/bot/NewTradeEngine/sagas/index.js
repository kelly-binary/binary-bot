import { take, fork, takeEvery } from 'redux-saga/effects';
import * as actions from '../constants/actions';
import init from './init';
import error from './error';

export default function* rootSaga() {
    yield takeEvery('*', error);
    const { payload } = yield take(actions.INIT_SAGA);
    yield fork(init, payload);
}
