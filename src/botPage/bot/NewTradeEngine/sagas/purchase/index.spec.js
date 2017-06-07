import { testSaga } from 'redux-saga-test-plan';
import * as selectors from '../selectors';
import * as actions from '../../constants/actions';
import requestPurchase from './requestPurchase';
import purchase from './';

const $scope = {};

const contractType = 'CALL';

const selectedProposal = { contract_type: 'CALL' };

const receivedProposals = {
    uuid1: {},
    uuid2: selectedProposal,
};

const error = Error('Unsuccesssful Purchase');

describe('Purchase saga', () => {
    it('should select a proposal using the contract type and purchase it', () => {
        testSaga(purchase, { $scope, contractType })
            .next()
            .select(selectors.receivedProposals)
            .next(receivedProposals)
            .put({ type: actions.REQUEST_PURCHASE })
            .next()
            .call(requestPurchase, { $scope, proposal: selectedProposal })
            .next()
            .put({ type: actions.PURCHASE_SUCCESSFULLY })
            .isDone();
    });
    it('should put PURCHASE_UNSUCCESSFULLY if requestPurchase fails', () => {
        testSaga(purchase, { $scope, contractType })
            .next()
            .select(selectors.receivedProposals)
            .next(receivedProposals)
            .put({ type: actions.REQUEST_PURCHASE })
            .next()
            .call(requestPurchase, { $scope, proposal: selectedProposal })
            .throw(error)
            .put({ type: actions.PURCHASE_UNSUCCESSFULLY, payload: error, error: true })
            .isDone();
    });
});
