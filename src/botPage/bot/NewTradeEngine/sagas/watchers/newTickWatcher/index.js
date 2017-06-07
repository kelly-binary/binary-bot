import { select, put, take, call } from 'redux-saga/effects';
import { throwUpdateWaitingForPurchase, updateWaitingForPurchase } from '../../../actionCreators';
import * as actions from '../../../constants/actions';
import * as states from '../../../constants/states';
import * as selectors from '../../selectors';

export default function* newTickWatcher(newTick) {
    const stage = yield select(selectors.stage);
    switch (stage) {
        case states.INITIALIZED: {
            const errorAction = yield call(throwUpdateWaitingForPurchase);
            yield put(errorAction);
            break;
        }
        case states.PROPOSALS_READY: {
            const stayAction = yield call(updateWaitingForPurchase, newTick, true);
            yield put(stayAction);
            break;
        }
        case states.STARTED: {
            yield take(actions.RECEIVE_ALL_PROPOSALS);
            const stayAction = yield call(updateWaitingForPurchase, newTick, true);
            yield put(stayAction);
            break;
        }
        default: {
            const exitAction = yield call(updateWaitingForPurchase, newTick, false);
            yield put(exitAction);
            break;
        }
    }
}
