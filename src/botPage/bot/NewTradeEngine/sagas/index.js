import { takeEvery } from 'redux-saga/effects';
import * as actions from '../constants/actions';
import init from './init';

export default function* rootSaga() {
    yield takeEvery(actions.INIT, init);
}
