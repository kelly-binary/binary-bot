import { call, fork } from 'redux-saga/effects';
import dataStream from '../dataStream';
import tickLoop from './tickLoop';

export default function* tick({ $scope, symbol }) {
    const channel = yield call(dataStream, { $scope, type: 'tick', symbol });
    const task = yield fork(tickLoop, channel);
    return task;
}
