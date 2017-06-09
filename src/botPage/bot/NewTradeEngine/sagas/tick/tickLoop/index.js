import { take, put } from 'redux-saga/effects';
import { newTick } from '../../../actions/standard';

export default function* tickLoop(channel) {
    const takeFromChannel = take(channel);
    let payload = yield takeFromChannel;

    while (payload) {
        const { epoch } = payload;
        yield put(newTick(epoch));
        payload = yield takeFromChannel;
    }
}
