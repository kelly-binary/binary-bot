import { select, call, put, spawn } from 'redux-saga/effects';
import * as actions from '../../constants/actions';
import * as selectors from '../selectors';
import proposal from '../proposal';
import requestPurchase from './requestPurchase';
import purchaseDone from '../../actions/purchaseDone';

export default function* purchase({ $scope, contractType }) {
    const receivedProposals = yield select(selectors.receivedProposals);
    yield put({ type: actions.REQUEST_PURCHASE });
    const selectedProposal = Object.values(receivedProposals).find(p => p.contractType === contractType);
    try {
        const { buy: { contract_id: contractID } } = yield call(requestPurchase, {
            $scope,
            proposal: selectedProposal,
        });
        yield put(purchaseDone({ itemName: actions.PURCHASE_DONE, payload: contractID }));
    } catch (e) {
        yield put(purchaseDone({ itemName: actions.PURCHASE_DONE, payload: e, error: true }));
    }
    const tradeOption = yield select(selectors.tradeOption);
    yield spawn(proposal, { $scope, tradeOption });
}
