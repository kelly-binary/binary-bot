import { select, put, take } from 'redux-saga/effects';
import * as actions from '../../../constants/actions';
import * as states from '../../../constants/states';
import * as selectors from '../../selectors';

export default function* newTickWatcher(newTick) {
    const stage = yield select(selectors.stage);
    switch (stage) {
        case states.INITIALIZED:
            break;
        case states.PROPOSALS_READY:
            return put({ type: actions.UPDATE_BEFORE_SCOPE, payload: { timestamp: newTick, stayInsideScope: true } });
        case states.STARTED:
            yield take(actions.RECEIVE_ALL_PROPOSALS);
            return put({ type: actions.UPDATE_BEFORE_SCOPE, payload: { timestamp: newTick, stayInsideScope: true } });
        default:
            return put({ type: actions.UPDATE_BEFORE_SCOPE, payload: { timestamp: newTick, stayInsideScope: false } });
    }
}
