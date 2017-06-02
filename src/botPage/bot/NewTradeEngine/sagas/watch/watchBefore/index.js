import { select, put, take } from 'redux-saga/effects';
import * as selectors from '../../selectors';
import * as states from '../../../constants/states';
import * as actions from '../../../constants/actions';

export default function* watchBefore() {
    const stage = yield select(selectors.stage);

    if (stage !== states.STARTED && stage !== states.PROPOSALS_READY) {
        yield put({ type: actions.EXIT_SCOPE });
    }

    if (stage === states.PROPOSALS_READY) {
        const { payload: { lastTick } } = yield take(actions.NEW_TICK);

        yield put({ type: actions.CONTINUE_SCOPE, payload: { timestamp: lastTick } });
    } else if (stage === states.STARTED) {
        const takeLastTickAndProposals = take([actions.NEW_TICK, actions.RECEIVE_ALL_PROPOSALS]);

        let proposalsReady = false;
        let lastTick = 0;

        while (lastTick === 0 || !proposalsReady) {
            const action = yield takeLastTickAndProposals;

            switch (action.type) {
                case actions.NEW_TICK:
                    lastTick = action.payload.lastTick;
                    break;
                case actions.RECEIVE_ALL_PROPOSALS:
                    proposalsReady = true;
                    break;
                default:
                    break;
            }
        }

        yield put({ type: actions.CONTINUE_SCOPE, payload: { timestamp: lastTick } });
    }
}
