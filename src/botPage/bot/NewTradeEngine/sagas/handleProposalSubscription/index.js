import { call, fork, select, put } from 'redux-saga/effects';
import * as selectors from '../selectors';
import dataStream from '../dataStream';
import requestProposals from './requestProposals';
import handleProposalReady from './handleProposalReady';
import handleProposalStream from './handleProposalStream';
import handleForgottenProposal from './handleForgottenProposal';

export default function* handleProposalSubscription({ tradeOption, $scope }) {
    const receivedProposals = yield select(selectors.receivedProposals);
    const proposals = Object.values(receivedProposals);
    for (let i = 0; i < proposals.length; i++) {
        yield fork(handleForgottenProposal, { $scope, proposal: proposals[i] });
    }
    try {
        yield fork(requestProposals, tradeOption);
        const channel = yield call(dataStream, { type: 'proposal', $scope });
        yield fork(handleProposalStream, channel);
        yield fork(handleProposalReady);
    } catch (error) {
        yield put({ type: 'RECEIVE_PROPOSAL_ERROR', payload: error, error: true });
    }
}
