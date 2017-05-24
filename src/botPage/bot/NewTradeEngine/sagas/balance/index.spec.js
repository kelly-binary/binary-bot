import * as matchers from 'redux-saga-test-plan/matchers';
import { expectSaga, testSaga } from 'redux-saga-test-plan';
import * as actions from '../../constants/actions';
import createScope from '../createScope';
import dataStream from '../dataStream';
import requestBalance from './requestBalance';
import balance from './';

describe('balance channel', () => {
    const $scope = createScope();
    const token = 'some token';
    const arg = { $scope, token, type: 'balance' };
    const fakeChannel = dataStream(arg);

    it('should requestBalance, take the first balance and put BALANCE_RECEIVED', () => {
        const payload = { balance: '12.00', currency: 'USD' };
        expectSaga(balance, arg)
            .provide([
                [matchers.call.fn(requestBalance), {}],
                [matchers.call(dataStream, arg), fakeChannel],
                {
                    take({ channel }, next) {
                        if (channel === fakeChannel) {
                            return payload;
                        }
                        return next();
                    },
                },
            ])
            .call(requestBalance, arg)
            .call(dataStream, arg)
            .take(fakeChannel)
            .put({ type: actions.BALANCE_RECEIVED, payload })
            .run();
    });

    it('should put BALANCE_RECEIVED_ERROR with the thrown error', () => {
        const payload = new Error('some error');

        testSaga(balance, { ...arg, token: 'some invalid token' })
            .next()
            .throw(payload)
            .put({ type: actions.BALANCE_RECEIVED_ERROR, payload, error: true });
    });
});
