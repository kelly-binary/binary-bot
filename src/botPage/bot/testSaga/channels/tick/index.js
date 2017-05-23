import { call, take, put } from 'redux-saga/effects';
import dataStream from '../../dataStream';

export default function* tick({ $scope }) {
    const channel = yield call(dataStream, { $scope, type: 'tick' });
    const { epoch } = yield take(channel);
    yield put({ type: 'NEW_TICK', payload: { lastTick: epoch } });
}
