import { observer as globalObserver } from 'binary-common-utils/lib/observer';
import { call, put } from 'redux-saga/effects';
import stopBecauseOfError from '../../actions/stopBecauseOfError';

export default function* errorSaga({ payload, error }) {
    if (error) {
        yield call([globalObserver, globalObserver.emit], 'Error', payload);
        yield put(stopBecauseOfError(payload));
    }
}
