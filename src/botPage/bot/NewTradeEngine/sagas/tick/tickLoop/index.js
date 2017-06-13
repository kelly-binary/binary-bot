import { take, put } from 'redux-saga/effects';
import { newTick } from '../../../actions/standard';

export default function* tickLoop(channel) {
    console.log(channel);

    let payload = yield take(channel);
    console.log(payload);
    while (payload) {
        const { epoch } = payload;
        yield put(newTick(epoch));
        payload = yield take(channel);
    }
}
