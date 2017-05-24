import * as matchers from 'redux-saga-test-plan/matchers';
import { expectSaga } from 'redux-saga-test-plan';
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
    const payload = { balance: '12.00', currency: 'USD' };

    it('should requestBalance, take the first balance and put BALANCE_RECEIVED', () => {
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
});
