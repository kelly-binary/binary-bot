import { call, take, put } from 'redux-saga/effects';
import * as actions from '../../constants/actions';
import dataStream from '../dataStream';
import requestBalance from './requestBalance';

export default function* balance(arg) {
    const { $scope } = arg;
    try {
        yield call(requestBalance, arg);
        const channel = yield call(dataStream, { $scope, type: 'balance' });
        const payload = yield take(channel);
        yield put({ type: actions.BALANCE_RECEIVED, payload });
    } catch (payload) {
        yield put({ type: actions.BALANCE_RECEIVED_ERROR, payload, error: true });
    }
}
