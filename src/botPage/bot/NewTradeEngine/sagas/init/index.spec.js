import { expectSaga } from 'redux-saga-test-plan';
import * as matchers from 'redux-saga-test-plan/matchers';
import * as actions from '../../constants/actions';
import createScope from '../createScope';
import tick from '../tick';
import balance from '../balance';
import init from './';

describe('init saga', () => {
    const symbol = 'R_100';
    const initOption = { symbol };
    const token = 'some token';
    const $scope = createScope();

    it('should wait for tick stream and balance to put INIT_DATA', () => {
        expectSaga(init, { $scope, token, initOption })
            .provide([[matchers.spawn.fn(tick), {}]])
            .provide([[matchers.spawn.fn(balance), {}]])
            .dispatch({ type: actions.NEW_TICK, payload: {} })
            .dispatch({ type: actions.BALANCE_RECEIVED, payload: {} })
            .spawn(tick, { $scope, symbol })
            .spawn(balance, { $scope, token })
            .take(actions.NEW_TICK)
            .take(actions.BALANCE_RECEIVED)
            .put({ type: actions.INIT_DATA, payload: initOption })
            .run();
    });
});
