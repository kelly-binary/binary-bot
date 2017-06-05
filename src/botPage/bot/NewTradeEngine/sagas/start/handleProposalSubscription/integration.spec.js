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

const tradeOption = {
    candleInterval: 60,
    contractTypes : ['DIGITEVEN', 'DIGITODD'],
    symbol        : 'R_100',
    amount        : 1,
    currency      : 'USD',
    duration      : 5,
    duration_unit : 't',
};

const uuids = ['uuid1', 'uuid2'];
const ids = ['id1', 'id2'];

const expectedToReceivedProposals = {
    uuid1: { id: ids[0] },
    uuid2: { id: ids[1] },
};

const proposalResponses = [
    {
        passthrough: {
            uuid        : 'uuid1',
            contractType: 'DIGITEVEN',
        },
        proposal: { id: ids[0] },
    },
    {
        passthrough: {
            uuid        : 'uuid2',
            contractType: 'DIGITODD',
        },
        proposal: { id: ids[1] },
    },
];
const requestedProposals = [];

const fakeChannel = dataStream({ $scope, type: 'proposal' });

let index = 0;

const proposalResponseList = Object.entries(expectedToReceivedProposals).map(([u, p]) => ({ [u]: p }));

api.subscribeToPriceForContractProposal = proposal => {
    requestedProposals.push(proposal);
    api.events.emit('proposal', expectedToReceivedProposals[proposal.passthrough.uuid]);
};
describe('proposal subscription integration', () => {
    it('should put RECEIVE ALL PROPOSALS', () =>
        expectSaga(handleProposalSubscription, { tradeOption, $scope, uuids })
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
            .put({ type: `UPDATE_${actions.REQUESTED_PROPOSAL}`, payload: requestedProposals[0] })
            .put({ type: `UPDATE_${actions.REQUESTED_PROPOSAL}`, payload: requestedProposals[1] })
            .put({ type: actions.RECEIVE_ALL_PROPOSALS })
            .run());
});
