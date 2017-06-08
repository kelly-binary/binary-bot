import { observer as globalObserver } from 'binary-common-utils/lib/observer';
import { call, put } from 'redux-saga/effects';
import * as actions from '../../constants/actions';

export default function* errorSaga({ payload, error }) {
    if (error) {
        yield call([globalObserver, globalObserver.emit], 'Error', payload);
        yield put({ type: actions.ERROR_OCCURRED, payload, error: true });
    }
}
