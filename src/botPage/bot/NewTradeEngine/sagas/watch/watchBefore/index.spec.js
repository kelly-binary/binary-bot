import { testSaga } from 'redux-saga-test-plan';
import * as states from '../../../constants/states';
import * as actions from '../../../constants/actions';
import * as selectors from '../../selectors';
import watchBefore from './';

describe('watching before', () => {
    const lastTick = 123456;

    it('should EXIT_SCOPE if neither PROPOSALS_READY nor STARTED', () => {
        testSaga(watchBefore)
            .next()
            .select(selectors.stage)
            .next(states.STOPPED)
            .put({ type: actions.EXIT_SCOPE })
            .next()
            .isDone();
    });
    it('should wait for NEW_TICK if PROPOSALS_READY', () => {
        testSaga(watchBefore)
            .next()
            .select(selectors.stage)
            .next(states.PROPOSALS_READY)
            .take(actions.NEW_TICK)
            .next({ payload: { lastTick } })
            .put({ type: actions.CONTINUE_SCOPE, payload: { timestamp: lastTick } })
            .next()
            .isDone();
    });
    it('should wait for NEW_TICK and RECEIVE_PROPOSALS if STARTED', () => {
        testSaga(watchBefore)
            .next()
            .select(selectors.stage)
            .next(states.STARTED)
            .take([actions.NEW_TICK, actions.RECEIVE_PROPOSALS])
            .next({ type: actions.NEW_TICK, payload: { lastTick } })
            .take([actions.NEW_TICK, actions.RECEIVE_PROPOSALS])
            .next({ type: actions.RECEIVE_PROPOSALS })
            .put({ type: actions.CONTINUE_SCOPE, payload: { timestamp: lastTick } })
            .next()
            .isDone();
    });
});
