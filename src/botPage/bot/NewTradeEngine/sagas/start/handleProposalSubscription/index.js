import { call, fork, select, put } from 'redux-saga/effects';
import * as selectors from '../../selectors';
import dataStream from '../../dataStream';
import requestProposals from './requestProposals';
import handleProposalReady from './handleProposalReady';
import handleProposalStream from './handleProposalStream';
import handleForgottenProposal from './handleForgottenProposal';

export default function* handleProposalSubscription({ proposals, $scope, uuids }) {
    const receivedProposals = yield select(selectors.receivedProposals);
    const receivedProposalsPayload = Object.values(receivedProposals);

    for (let i = 0; i < receivedProposalsPayload.length; i++) {
        yield fork(handleForgottenProposal, { $scope, proposal: receivedProposalsPayload[i] });
    }
    try {
        yield call(requestProposals, { proposals, $scope, uuids });
        const channel = yield call(dataStream, { type: 'proposal', $scope });
        yield fork(handleProposalStream, channel);
        yield fork(handleProposalReady);
    } catch (error) {
        yield put({ type: 'RECEIVE_PROPOSAL_ERROR', payload: error, error: true });
    }
}
