import { eventChannel } from 'redux-saga';
import { testSaga } from 'redux-saga-test-plan';
import { tradeOptionToProposal } from '../../../tools';
import { updatePropertyAction } from '../../tools';
import * as properties from '../../constants/properties';
import dataStream from '../dataStream';
import * as selectors from '../selectors';
import requestProposals from './requestProposals';
import handleProposalReady from './handleProposalReady';
import handleProposalStream from './handleProposalStream';
import handleForgottenProposal from './handleForgottenProposal';
import proposal from './';

const fakeChannel = eventChannel(() => () => {});
const $scope = {};
const proposalID1 = 'proposalID1';
const proposalID2 = 'proposalID2';
const proposal1 = { id: '0', uuid: proposalID1 };
const proposal2 = { id: '1', uuid: proposalID2 };
const payload = { [proposalID1]: proposal1, [proposalID2]: proposal2 };
const error = Error('some error');

const tradeOption = {
    contractTypes: ['PUT', 'CALL'],
};

const proposalRequest1 = {
    contract_type: 'CALL',
};

const proposalRequest2 = {
    contract_type: 'PUT',
};

const proposalRequests = [
    { request: proposalRequest1, uuid: proposalID1 },
    { request: proposalRequest2, uuid: proposalID2 },
];

const arg = { tradeOption, $scope };

const requestProposalsArg = { proposalRequests, $scope };

describe('proposal', () => {
    it('should not forget propsoals if there is no proposalsReceived', () => {
        testSaga(proposal, arg)
            .next()
            .call(tradeOptionToProposal, tradeOption)
            .next(proposalRequests)
            .select(selectors.receivedProposals)
            .next({})
            .put({ type: updatePropertyAction(properties.REQUESTED_PROPOSAL), payload: { [proposalID1]: true } })
            .next()
            .put({ type: updatePropertyAction(properties.REQUESTED_PROPOSAL), payload: { [proposalID2]: true } })
            .next()
            .call(requestProposals, requestProposalsArg)
            .next()
            .call(dataStream, { type: 'proposal', $scope })
            .next(fakeChannel)
            .spawn(handleProposalStream, fakeChannel)
            .next()
            .spawn(handleProposalReady)
            .next()
            .isDone();
    });
    it('should request a new proposal and create a dataStream for proposals', () => {
        testSaga(proposal, arg)
            .next()
            .call(tradeOptionToProposal, tradeOption)
            .next(proposalRequests)
            .select(selectors.receivedProposals)
            .next(payload)
            .spawn(handleForgottenProposal, { $scope, proposal: proposal1 })
            .next()
            .spawn(handleForgottenProposal, { $scope, proposal: proposal2 })
            .next()
            .put({ type: updatePropertyAction(properties.REQUESTED_PROPOSAL), payload: { [proposalID1]: true } })
            .next()
            .put({ type: updatePropertyAction(properties.REQUESTED_PROPOSAL), payload: { [proposalID2]: true } })
            .next()
            .call(requestProposals, requestProposalsArg)
            .next()
            .call(dataStream, { type: 'proposal', $scope })
            .next(fakeChannel)
            .spawn(handleProposalStream, fakeChannel)
            .next()
            .spawn(handleProposalReady)
            .next()
            .isDone();
    });
    it('should put RECEIVE_PROPOSAL_ERROR if requestProposals fails', () => {
        testSaga(proposal, arg)
            .next()
            .call(tradeOptionToProposal, tradeOption)
            .next(proposalRequests)
            .select(selectors.receivedProposals)
            .next(payload)
            .spawn(handleForgottenProposal, { $scope, proposal: proposal1 })
            .next()
            .spawn(handleForgottenProposal, { $scope, proposal: proposal2 })
            .next()
            .put({ type: updatePropertyAction(properties.REQUESTED_PROPOSAL), payload: { [proposalID1]: true } })
            .next()
            .put({ type: updatePropertyAction(properties.REQUESTED_PROPOSAL), payload: { [proposalID2]: true } })
            .next()
            .call(requestProposals, requestProposalsArg)
            .next()
            .throw(error)
            .put({ type: 'RECEIVE_PROPOSAL_ERROR', payload: error, error: true })
            .next()
            .isDone();
    });
});
