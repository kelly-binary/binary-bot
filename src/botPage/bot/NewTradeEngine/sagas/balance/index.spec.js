import { testSaga } from 'redux-saga-test-plan';
import { eventChannel } from 'redux-saga';
import updateReceivedBalance from '../../actions/updateReceivedBalance';
import dataStream from '../dataStream';
import requestBalance from './requestBalance';
import balance from './';

const $scope = {};
const token = 'some token';
const arg = { $scope, token, type: 'balance' };
const fakeChannel = eventChannel(() => () => {});
const payload = { balance: '12.00', currency: 'USD' };
const data = { balance: payload };

describe('balance saga', () => {
    it('should create a dataStream for balance', () => {
        testSaga(balance, { ...arg, token })
            .next()
            .call(requestBalance, arg)
            .next()
            .call(dataStream, { $scope, type: 'balance' })
            .next(fakeChannel)
            .take(fakeChannel)
            .next(data)
            .put(updateReceivedBalance({ payload }))
            .next()
            .isDone();
    });
    it('should put updateReceivedBalance error with the thrown error', () => {
        const errorPayload = new Error('some error');

        testSaga(balance, { ...arg, token: 'some invalid token' })
            .next()
            .throw(errorPayload)
            .put(updateReceivedBalance({ payload: errorPayload, error: true }))
            .next()
            .isDone();
    });
});
