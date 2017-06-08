import { testSaga } from 'redux-saga-test-plan';
import { tradeOptionToProposal } from '../../../tools';
import handleProposalSubscription from '../start/handleProposalSubscription';
import requestProposalSubscription from './';

const tradeOption = {
    contractTypes: ['PUT', 'CALL'],
    amount       : 12.00,
};

const $scope = {};

const proposalRequests = {};

describe('requestProposalSubscription saga', () => {
    it('should call proposal subscription saga with given tradeOption', () => {
        testSaga(requestProposalSubscription, { $scope, tradeOption })
            .next()
            .call(tradeOptionToProposal, tradeOption)
            .next(proposalRequests)
            .call(handleProposalSubscription, { $scope, proposalRequests })
            .next()
            .isDone();
    });
});
