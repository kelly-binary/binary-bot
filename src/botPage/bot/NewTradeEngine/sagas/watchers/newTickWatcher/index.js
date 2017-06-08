import { select, put, take, call } from 'redux-saga/effects';
import updateWaitingForPurchase from '../../../actions/updateWaitingForPurchase';
import * as actions from '../../../constants/actions';
import * as states from '../../../constants/states';
import * as selectors from '../../selectors';

export default function* newTickWatcher(newTick) {
    const stage = yield select(selectors.stage);
    switch (stage) {
        case states.INITIALIZED:
            yield put(yield call(updateWaitingForPurchase, { error: true }));
            break;
        case states.PROPOSALS_READY:
            yield put(yield call(updateWaitingForPurchase, { timestamp: newTick, stayInsideScope: true }));
            break;
        case states.STARTED:
            yield take(actions.RECEIVE_ALL_PROPOSALS);
            yield put(yield call(updateWaitingForPurchase, { timestamp: newTick, stayInsideScope: true }));
            break;
        default:
            yield put(yield call(updateWaitingForPurchase, { timestamp: newTick, stayInsideScope: false }));
            break;
    }
}
