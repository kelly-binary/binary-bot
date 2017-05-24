import { call, take, put, fork } from 'redux-saga/effects';
import * as actions from '../../constants/actions';
import dataStream from '../dataStream';

function* tickLoop(channel) {
    let payload = yield take(channel);
    while (payload) {
        yield put({ type: actions.NEW_TICK, payload: { lastTick: payload.epoch } });
        payload = yield take(channel);
    }
}

export default function* tick({ $scope, symbol }) {
    const channel = yield call(dataStream, { $scope, type: 'tick', symbol });
    const task = yield fork(tickLoop, channel);
    return task;
}
