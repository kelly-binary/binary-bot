import { call, take, put } from 'redux-saga/effects';
import dataStream from '../../dataStream';

export default function* tick({ $scope, symbol }) {
    const channel = yield call(dataStream, { $scope, type: 'tick', symbol });
    let payload = yield take(channel);
    while (payload) {
        yield put({ type: 'NEW_TICK', payload: { lastTick: payload.epoch } });
        payload = yield take(channel);
    }
}
