import { testSaga } from 'redux-saga-test-plan';
import * as actions from '../../../constants/actions';
import * as states from '../../../constants/states';
import * as selectors from '../../selectors';
import newTickWatcher from './';

describe('newTickWatcher saga', () => {
    it('should EXIT_BEFORE_PURCHASE_SCOPE if stage is not STARTED or PROPSOALS_READY', () => {
        testSaga(newTickWatcher)
            .next()
            .select(selectors.stage)
            .next(states.STOPPED)
            .put({ type: actions.EXIT_BEFORE_PURCHASE_SCOPE })
            .next()
            .isDone();
    });
    it('should ENTER_BEFORE_PURCHASE_SCOPE if stage is PROPOSALS_READY', () => {
        testSaga(newTickWatcher)
            .next()
            .select(selectors.stage)
            .next(states.PROPOSALS_READY)
            .put({ type: actions.ENTER_BEFORE_PURCHASE_SCOPE })
            .next()
            .isDone();
    });
    it('should ENTER_BEFORE_PURCHASE_SCOPE after RECEIVE_ALL_PROPOSALS if stage is STARTED', () => {
        testSaga(newTickWatcher)
            .next()
            .select(selectors.stage)
            .next(states.STARTED)
            .take(actions.RECEIVE_ALL_PROPOSALS)
            .next()
            .put({ type: actions.ENTER_BEFORE_PURCHASE_SCOPE })
            .next()
            .isDone();
    });
});
