import { testSaga } from 'redux-saga-test-plan';
import requestPurchaseAction from '../../actions/requestPurchase';
import purchaseDone from '../../actions/purchaseDone';
import * as actions from '../../constants/actions';
import * as selectors from '../selectors';
import proposal from '../proposal';
import requestPurchase from './requestPurchase';
import purchase from './';

const $scope = {};

const contractType = 'CALL';

const selectedProposal = { contractType: 'CALL' };

const receivedProposals = {
    uuid1: {},
    uuid2: selectedProposal,
};

const contractID = '1';

const receivedPurchase = { buy: { contract_id: contractID } };

const tradeOption = {};

const error = Error('Unsuccesssful Purchase');

describe('Purchase saga', () => {
    it('should select a proposal using the contract type and purchase it', () => {
        testSaga(purchase, { $scope, contractType })
            .next()
            .select(selectors.receivedProposals)
            .next(receivedProposals)
            .put(requestPurchaseAction())
            .next()
            .call(requestPurchase, { $scope, proposal: selectedProposal })
            .next(receivedPurchase)
            .put(purchaseDone({ itemName: actions.PURCHASE_DONE, payload: contractID }))
            .next()
            .select(selectors.tradeOption)
            .next(tradeOption)
            .spawn(proposal, { $scope, tradeOption })
            .next()
            .isDone();
    });
    it('should put PURCHASE_DONE if requestPurchase fails', () => {
        testSaga(purchase, { $scope, contractType })
            .next()
            .select(selectors.receivedProposals)
            .next(receivedProposals)
            .put(requestPurchaseAction())
            .next()
            .call(requestPurchase, { $scope, proposal: selectedProposal })
            .throw(error)
            .put(purchaseDone({ itemName: actions.PURCHASE_DONE, payload: error, error: true }))
            .next()
            .select(selectors.tradeOption)
            .next(tradeOption)
            .spawn(proposal, { $scope, tradeOption })
            .next()
            .isDone();
    });
});
