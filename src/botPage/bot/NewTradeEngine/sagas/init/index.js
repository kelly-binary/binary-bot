import { spawn, take, put } from 'redux-saga/effects';
import * as actions from '../../constants/actions';
import * as properties from '../../constants/properties';
import { updatePropertyAction } from '../../tools';
import { initialize } from '../../actions/standard';
import tick from '../tick';
import balance from '../balance';

export default function* init({ $scope, token, initOption }) {
    const { symbol } = initOption;
    yield spawn(tick, { $scope, symbol });
    yield spawn(balance, { $scope, token });
    yield take(actions.NEW_TICK);
    yield take(updatePropertyAction(properties.RECEIVED_BALANCE));
    yield put(initialize(initOption));
}
