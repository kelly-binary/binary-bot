import { testSaga } from 'redux-saga-test-plan';
import * as actions from '../../constants/actions';
import * as states from '../../constants/states';
import * as selectors from '../selectors';
import handleProposalSubscription from '../handleProposalSubscription';
import start from './';

const twoContracts = {
    contractTypes: ['PUT', 'CALL'],
};
const oneContract = {
    contractTypes: ['PUT'],
};

const $scope = {};

describe('start saga', () => {
    it('should not have any effect if it\'s not INITIALIZED', () => {
        testSaga(start, { $scope, tradeOption: twoContracts })
            .next()
            .select(selectors.stage)
            .next(states.STOPPED)
            .put({ type: actions.START, payload: twoContracts })
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
            .put({ type: actions.START, payload: oneContract })
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
            .put({ type: actions.START, payload: oneContract })
            .next()
            .fork(handleProposalSubscription, { tradeOption: oneContract, $scope })
            .next()
            .isDone();
    });
});
