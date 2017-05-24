import { expectSaga } from 'redux-saga-test-plan';
import * as matchers from 'redux-saga-test-plan/matchers';
import * as actions from '../../constants/actions';
import createScope from '../createScope';
import tick from '../tick';
import init from './';

describe('init saga', () => {
    const symbol = 'R_100';
    const initOption = { symbol };
    const token = 'some token';
    const $scope = createScope();

    it('should wait for tick stream and balance to put INIT_DATA', () => {
        expectSaga(init, { $scope, token, initOption })
            .provide([[matchers.call(tick, { $scope, symbol }), {}]])
            .put({ type: actions.INIT_DATA, payload: initOption })
            .run();
    });
});
