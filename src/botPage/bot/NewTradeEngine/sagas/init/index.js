import { call, put } from 'redux-saga/effects';
import * as actions from '../../constants/actions';
import tick from '../tick';

export default function* init({ payload: { $scope, initOption } }) {
    const { symbol } = initOption;
    yield call(tick, { $scope, symbol });
    yield put({ type: actions.INIT_DATA, payload: initOption });
}
