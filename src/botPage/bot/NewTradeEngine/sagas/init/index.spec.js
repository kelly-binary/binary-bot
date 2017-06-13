import { testSaga } from 'redux-saga-test-plan';
import * as actions from '../../constants/actions';
import { initialize } from '../../actions/standard';
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
        testSaga(init, { $scope, token, initOption })
            .next()
            .spawn(tick, { $scope, symbol })
            .next()
            .spawn(balance, { $scope, token })
            .next()
            .take(actions.NEW_TICK)
            .next()
            .take(actions.UPDATE_RECEIVED_BALANCE)
            .next()
            .put(initialize(initOption))
            .next()
            .isDone();
    });
});
