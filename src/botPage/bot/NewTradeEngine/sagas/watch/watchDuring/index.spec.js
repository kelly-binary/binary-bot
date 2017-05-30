import { testSaga } from 'redux-saga-test-plan';
import * as states from '../../../constants/states';
import * as actions from '../../../constants/actions';
import * as selectors from '../../selectors';
import watchDuring from './';

describe('watching during', () => {
    const openContracts = [];

    it('should EXIT_SCOPE if neither SUCCESSFUL_PURCHASE nor OPEN_CONTRACT', () => {
        testSaga(watchDuring)
            .next()
            .select(selectors.stageSelector)
            .next(states.STOPPED)
            .put({ type: actions.EXIT_SCOPE })
            .next()
            .isDone();
    });
    it.skip('should wait for RECEIVE_OPEN_CONTRACT if SUCCESSFUL_PURCHASE', () => {
        testSaga(watchDuring)
            .next()
            .select(selectors.stageSelector)
            .next(states.SUCCESSFUL_PURCHASE)
            .take(actions.RECEIVE_OPEN_CONTRACT)
            .next(openContracts[0])
            .put({ type: actions.CONTINUE_SCOPE, payload: { timestamp: openContracts[0].current_spot_time } })
            .next()
            .isDone();
    });
    it.skip('should wait for RECEIVE_OPEN_CONTRACT if OPEN_CONTRACT', () => {});
    it.skip('should EXIT_SCOPE if OPEN_CONTRACT is sold', () => {});
});
