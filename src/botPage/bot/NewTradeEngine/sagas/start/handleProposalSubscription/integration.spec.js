import * as matchers from 'redux-saga-test-plan/matchers';
import { expectSaga } from 'redux-saga-test-plan';
import { select } from 'redux-saga/effects';
import handleProposalSubscription from './';
import * as actions from '../../../constants/actions';
import * as selectors from '../../selectors';
import createScope from '../../createScope';
import dataStream from '../../dataStream';

const $scope = createScope();
const { api } = $scope;

const ids = ['id1', 'id2'];

const uuid1 = 'uuid1';
const uuid2 = 'uuid2';

const contractType1 = 'DIGITEVEN';
const contractType2 = 'DIGITODD';

const expectedToReceiveProposals = {
    uuid1: { id: ids[0], uuid: uuid1, contractType: contractType1 },
    uuid2: { id: ids[1], uuid: uuid2, contractType: contractType2 },
};

const proposalResponses = [
    {
        passthrough: {
            uuid        : uuid1,
            contractType: contractType1,
        },
        proposal: { id: ids[0] },
    },
    {
        passthrough: {
            uuid        : uuid2,
            contractType: contractType2,
        },
        proposal: { id: ids[1] },
    },
];

const proposalRequests = [{ uuid: 'uuid1', request: {} }, { uuid: 'uuid2', request: {} }];

const requestedProposals = {
    uuid1: proposalRequests[0],
    uuid2: proposalRequests[1],
};

const requestProposalsList = Object.entries(requestedProposals).map(([uuid, val]) => ({ [uuid]: val }));

const fakeChannel = dataStream({ $scope, type: 'proposal' });

let index = 0;

const proposalResponseList = Object.entries(expectedToReceiveProposals).map(([u, p]) => ({ [u]: p }));

api.subscribeToPriceForContractProposal = proposal =>
    api.events.emit('proposal', expectedToReceiveProposals[proposal.passthrough.uuid]);

describe('proposal subscription integration', () => {
    it('should put RECEIVE ALL PROPOSALS', () =>
        expectSaga(handleProposalSubscription, { proposalRequests, $scope })
            .provide([
                [matchers.call.fn(dataStream), fakeChannel],
                [select(selectors.forgottenProposals), {}],
                [select(selectors.receivedProposals), {}],
                [select(selectors.requestedProposals), requestedProposals],
                {
                    take({ channel }, next) {
                        if (channel === fakeChannel) {
                            return proposalResponses[index++];
                        }
                        return next();
                    },
                },
            ])
            .put({ type: `UPDATE_${actions.RECEIVED_PROPOSAL}`, payload: proposalResponseList[0] })
            .put({ type: `UPDATE_${actions.RECEIVED_PROPOSAL}`, payload: proposalResponseList[1] })
            .put({ type: `UPDATE_${actions.REQUESTED_PROPOSAL}`, payload: requestProposalsList[0] })
            .put({ type: `UPDATE_${actions.REQUESTED_PROPOSAL}`, payload: requestProposalsList[1] })
            .put({ type: actions.RECEIVE_ALL_PROPOSALS })
            .run());
});
