import { select, call, put, spawn } from 'redux-saga/effects';
import * as actions from '../../constants/actions';
import * as selectors from '../selectors';
import requestProposalSubscription from '../requestProposalSubscription';
import requestPurchase from './requestPurchase';

export default function* purchase({ $scope, contractType }) {
    const receivedProposals = yield select(selectors.receivedProposals);
    yield put({ type: actions.REQUEST_PURCHASE });
    const proposal = Object.values(receivedProposals).find(p => p.contractType === contractType);
    try {
        const { buy: { contract_id: contractID } } = yield call(requestPurchase, { $scope, proposal });
        yield put({ type: actions.PURCHASE_SUCCESSFULLY, payload: contractID });
    } catch (e) {
        yield put({ type: actions.PURCHASE_UNSUCCESSFULLY, payload: e, error: true });
    }
    const tradeOption = yield select(selectors.tradeOption);
    yield spawn(requestProposalSubscription, { $scope, tradeOption });
}
