import { call, take, put } from 'redux-saga/effects';
import updateReceivedBalance from '../../actions/updateReceivedBalance';
import dataStream from '../dataStream';
import requestBalance from './requestBalance';

export default function* balance(arg) {
    console.log(arg);
    const { $scope } = arg;
    try {
        yield call(requestBalance, arg);
        const channel = yield call(dataStream, { $scope, type: 'balance' });
        const { balance: payload } = yield take(channel);
        yield put(updateReceivedBalance({ payload }));
    } catch (payload) {
        yield put(updateReceivedBalance({ payload, error: true }));
    }
}
