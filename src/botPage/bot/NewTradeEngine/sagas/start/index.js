import { fork, take, put } from "redux-saga/effects";
import * as actions from "../../constants/actions";
import tick from "../tick";
import balance from "../balance";

export default function* init({ $scope, token, initOption }) {
  const { symbol } = initOption;
  yield fork(tick, { $scope, symbol });
  yield fork(balance, { $scope, token });
  yield take(actions.NEW_TICK);
  yield take(actions.BALANCE_RECEIVED);
  yield put({ type: actions.INIT_DATA, payload: initOption });
}
