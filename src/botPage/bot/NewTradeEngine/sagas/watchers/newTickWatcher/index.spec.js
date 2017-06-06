import { testSaga } from 'redux-saga-test-plan';
import * as actions from '../../../constants/actions';
import * as states from '../../../constants/states';
import * as selectors from '../../selectors';
import newTickWatcher from './';

const newTick = 12345;

describe('newTickWatcher saga', () => {
    it('should do nothing if stage is INITIALIZED', () => {
        testSaga(newTickWatcher, newTick).next().select(selectors.stage).next(states.INITIALIZED).isDone();
    });
    it('should UPDATE_BEFORE_SCOPE if stage is PROPOSALS_READY', () => {
        testSaga(newTickWatcher, newTick)
            .next()
            .select(selectors.stage)
            .next(states.PROPOSALS_READY)
            .put({ type: actions.UPDATE_BEFORE_SCOPE, payload: { timestamp: newTick, stayInsideScope: true } })
            .next()
            .isDone();
    });
    it('should UPDATE_BEFORE_SCOPE after RECEIVE_ALL_PROPOSALS if stage is STARTED', () => {
        testSaga(newTickWatcher, newTick)
            .next()
            .select(selectors.stage)
            .next(states.STARTED)
            .take(actions.RECEIVE_ALL_PROPOSALS)
            .next()
            .put({ type: actions.UPDATE_BEFORE_SCOPE, payload: { timestamp: newTick, stayInsideScope: true } })
            .next()
            .isDone();
    });
    it('should UPDATE_BEFORE_SCOPE with stayInsideScope == false if stage is not STARTED, INITIALIZED, nor PROPOSALS_READY', () => {
        testSaga(newTickWatcher, newTick)
            .next()
            .select(selectors.stage)
            .next(states.SUCCESSFUL_PURCHASE)
            .put({ type: actions.UPDATE_BEFORE_SCOPE, payload: { timestamp: newTick, stayInsideScope: false } })
            .next()
            .isDone();
    });
});
