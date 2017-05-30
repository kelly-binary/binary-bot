import { take, put } from 'redux-saga/effects';
import * as actions from '../../../constants/actions';

export default function* tickLoop(channel) {
    const takeFromChannel = take(channel);
    let payload = yield takeFromChannel;

    while (payload) {
        yield put({ type: actions.NEW_TICK, payload: payload.epoch });
        payload = yield takeFromChannel;
    }
}
