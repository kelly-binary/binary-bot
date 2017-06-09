import { testSaga } from 'redux-saga-test-plan';
import startAction from '../../actions/start';
import * as states from '../../constants/states';
import * as selectors from '../selectors';
import proposal from '../proposal';
import start from './';

const twoContracts = {
    contractTypes: ['PUT', 'CALL'],
    amount       : 12.00,
};

const oneContract = {
    contractTypes: ['PUT'],
    amount       : 1,
};

const $scope = {};

describe('start saga', () => {
    it('should not have any effect if it\'s not INITIALIZED', () => {
        testSaga(start, { $scope, tradeOption: twoContracts })
            .next()
            .select(selectors.stage)
            .next(states.STOPPED)
            .put(startAction(twoContracts))
            .next()
            .isDone();
    });
    it('should not start if it\'s the same trade option', () => {
        testSaga(start, { $scope, tradeOption: oneContract })
            .next()
            .select(selectors.stage)
            .next(states.INITIALIZED)
            .select(selectors.tradeOption)
            .next(oneContract)
            .put(startAction(oneContract))
            .next()
            .isDone();
    });
    it('should forget existing proposals and request for new proposals', () => {
        testSaga(start, { $scope, tradeOption: oneContract })
            .next()
            .select(selectors.stage)
            .next(states.INITIALIZED)
            .select(selectors.tradeOption)
            .next(twoContracts)
            .put(startAction(oneContract))
            .next()
            .spawn(proposal, { tradeOption: oneContract, $scope })
            .next()
            .isDone();
    });
});
