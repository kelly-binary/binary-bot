import { select, put, take } from 'redux-saga/effects';
import * as actions from '../../../constants/actions';
import * as states from '../../../constants/states';
import * as selectors from '../../selectors';

export default function* newTickWatcher() {
    const stage = yield select(selectors.stage);
    if (stage === states.PROPOSALS_READY) {
        yield put({ type: actions.ENTER_BEFORE_PURCHASE_SCOPE });
    } else if (stage === states.STARTED) {
        yield take(actions.RECEIVE_ALL_PROPOSALS);
        yield put({ type: actions.ENTER_BEFORE_PURCHASE_SCOPE });
    } else {
        yield put({ type: actions.EXIT_BEFORE_PURCHASE_SCOPE });
    }
}
