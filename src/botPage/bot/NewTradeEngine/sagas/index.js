import { take, fork } from 'redux-saga/effects';
import * as actions from '../constants/actions';
import init from './init';

export default function* rootSaga() {
    const { payload } = yield take(actions.INIT);
    yield fork(init, payload);
}
