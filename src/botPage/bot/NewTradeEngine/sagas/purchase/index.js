import { select, call } from 'redux-saga/effects';
import * as selectors from '../selectors';
import requestPurchase from './requestPurchase';

export default function* purchase({ $scope, contractType }) {
    const receivedProposals = yield select(selectors.receivedProposals);
    const proposal = Object.values(receivedProposals).find(p => p.contract_type === contractType);
    yield call(requestPurchase, { $scope, proposal });
}
