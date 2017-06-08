import { call } from 'redux-saga/effects';
import { tradeOptionToProposal } from '../../../tools';
import handleProposalSubscription from '../start/handleProposalSubscription';

export default function* requestProposalSubscription({ $scope, tradeOption }) {
    const proposalRequests = yield call(tradeOptionToProposal, tradeOption);
    yield call(handleProposalSubscription, { $scope, proposalRequests });
}
