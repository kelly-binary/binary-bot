import { expectSaga } from 'redux-saga-test-plan';
import * as matchers from 'redux-saga-test-plan/matchers';
import * as actions from '../../constants/actions';
import { initialize } from '../../actions/standard';
import { newTick } from '../../actions/standard';
import updateReceivedBalance from '../../actions/updateReceivedBalance';
import createScope from '../createScope';
import tick from '../tick';
import balance from '../balance';
import init from './';

describe('init saga', () => {
    const symbol = 'R_100';
    const initOption = { symbol };
    const token = 'some token';
    const $scope = createScope();

    it('should wait for tick stream and balance to put INITIALIZE', () => {
        expectSaga(init, { $scope, token, initOption })
            .provide([[matchers.spawn.fn(tick), {}]])
            .provide([[matchers.spawn.fn(balance), {}]])
            .dispatch(newTick({}))
            .dispatch(updateReceivedBalance({}))
            .spawn(tick, { $scope, symbol })
            .spawn(balance, { $scope, token })
            .take(actions.NEW_TICK)
            .take(actions.UPDATE_RECEIVED_BALANCE)
            .put(initialize(initOption))
            .run();
    });
});
