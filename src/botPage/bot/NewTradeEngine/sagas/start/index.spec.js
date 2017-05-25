import { testSaga } from 'redux-saga-test-plan';
import * as actions from '../../constants/actions';
import * as states from '../../constants/states';
import { start, stageSelector, tradeOptionSelector } from './';

describe('start saga', () => {
    const twoContracts = {
        contractTypes: ['PUT', 'CALL'],
    };
    const oneContract = {
        contractTypes: ['PUT'],
    };
    it('should not have any effect if it\'s not INITIALIZED', () => {
        testSaga(start, twoContracts)
            .next()
            .select(stageSelector)
            .next(states.STOPPED)
            .put({ type: actions.START, payload: twoContracts })
            .isDone();
    });
    it('should not start if it\'s the same trade option', () => {
        testSaga(start, oneContract)
            .next()
            .select(stageSelector)
            .next(states.INITIALIZED)
            .put({ type: actions.START, payload: oneContract })
            .next()
            .select(tradeOptionSelector)
            .next(oneContract)
            .isDone();
    });
    it('should START and REQUEST_ONE_PROPOSAL', () => {
        testSaga(start, oneContract)
            .next()
            .select(stageSelector)
            .next(states.INITIALIZED)
            .put({ type: actions.START, payload: oneContract })
            .next()
            .select(tradeOptionSelector)
            .next(twoContracts)
            .put({ type: actions.REQUEST_ONE_PROPOSAL })
            .isDone();
    });
    it('should START and REQUEST_TWO_PROPOSALS', () => {
        testSaga(start, twoContracts)
            .next()
            .select(stageSelector)
            .next(states.INITIALIZED)
            .put({ type: actions.START, payload: twoContracts })
            .next()
            .select(tradeOptionSelector)
            .next(oneContract)
            .put({ type: actions.REQUEST_TWO_PROPOSALS })
            .isDone();
    });
});
