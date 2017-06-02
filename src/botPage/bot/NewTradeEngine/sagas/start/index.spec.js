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
        testSaga(start, { $scope, twoContracts })
            .next()
            .select(selectors.stageSelector)
            .next(states.STOPPED)
            .put({ type: actions.START, payload: twoContracts })
            .next()
            .isDone();
    });
    it('should not start if it\'s the same trade option', () => {
        testSaga(start, { $scope, oneContract })
            .next()
            .select(selectors.stageSelector)
            .next(states.INITIALIZED)
            .select(selectors.tradeOptionSelector)
            .next(oneContract)
            .put({ type: actions.START, payload: oneContract })
            .next()
            .isDone();
    });
    it('should forget existing proposals and request for new proposals', () => {
        testSaga(start, { $scope, oneContract })
            .next()
            .select(selectors.stageSelector)
            .next(states.INITIALIZED)
            .select(selectors.tradeOptionSelector)
            .next(twoContracts)
            .put({ type: actions.START, payload: oneContract })
            .next()
            .fork(handleProposalSubscription, oneContract)
            .next()
            .isDone();
    });
});
