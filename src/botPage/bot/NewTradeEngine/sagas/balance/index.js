import { call, take, put } from 'redux-saga/effects';
import * as actions from '../../constants/actions';
import dataStream from '../dataStream';
import requestBalance from './requestBalance';

export default function* balance(arg) {
    const { $scope } = arg;
    try {
        yield call(requestBalance, arg);
        const channel = yield call(dataStream, { $scope, type: 'balance' });
        const { balance: payload } = yield take(channel);
        yield put({ type: actions.UPDATE_RECEIVED_BALANCE, payload });
    } catch (payload) {
        yield put({ type: actions.UPDATE_RECEIVED_BALANCE_ERROR, payload, error: true });
    }
}
