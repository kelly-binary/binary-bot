import { take, fork, takeEvery } from 'redux-saga/effects';
import * as actions from '../constants/actions';
import error from './error';
import init from './init';

function* customTakeEvery(pattern, saga, ...args) {
    // eslint-disable-next-line func-names
    const task = yield fork(function*() {
        // eslint-disable-next-line no-constant-condition
        while (true) {
            const { payload } = yield take(pattern);
            yield fork(saga, ...args.concat(payload));
        }
    });
    return task;
}

export default function* rootSaga() {
    yield takeEvery('*', error);
    yield customTakeEvery(actions.INIT_SAGA, init);
}
