import { spawn, take, put } from 'redux-saga/effects';
import * as actions from '../../constants/actions';
import tick from '../tick';
import balance from '../balance';

export default function* init({ $scope, token, initOption }) {
    const { symbol } = initOption;
    yield spawn(tick, { $scope, symbol });
    yield spawn(balance, { $scope, token });
    yield take(actions.NEW_TICK);
    yield take(actions.UPDATE_RECEIVED_BALANCE);
    yield put({ type: actions.INITIALIZE, payload: initOption });
}
