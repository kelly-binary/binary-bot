import * as matchers from 'redux-saga-test-plan/matchers';
import { expectSaga } from 'redux-saga-test-plan';
import { select } from 'redux-saga/effects';
import { tradeOptionToProposal } from '../../../tools';
import proposalInfo from '../../actions/proposalInfo';
import receiveAllProposals from '../../actions/receiveAllProposals';
import proposal from './';
import * as properties from '../../constants/properties';
import * as selectors from '../selectors';
import createScope from '../createScope';
import dataStream from '../dataStream';

const $scope = createScope();
const { api } = $scope;

const ids = ['id1', 'id2'];

const tradeOption = {
    contractTypes: [contractType1, contractType2],
    amount       : 12,
};

const proposalRequests = tradeOptionToProposal(tradeOption);

const uuid1 = proposalRequests[0].uuid;
const uuid2 = proposalRequests[1].uuid;

const contractType1 = 'DIGITEVEN';
const contractType2 = 'DIGITODD';

const expectedToReceiveProposals = {
    [uuid1]: { id: ids[0], uuid: uuid1, contractType: contractType1 },
    [uuid2]: { id: ids[1], uuid: uuid2, contractType: contractType2 },
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

const requestedProposals = {
    [uuid1]: true,
    [uuid2]: true,
};

const uuidOld1 = 'uuidOld1';
const uuidOld2 = 'uuidOld2';

const receivedProposals = {
    [uuidOld1]: { id: 'idOld1', uuid: uuidOld1, contractType: contractType1 },
    [uuidOld2]: { id: 'idOld2', uuid: uuidOld2, contractType: contractType1 },
};

const requestProposalsList = Object.entries(requestedProposals).map(([uuid, val]) => ({ [uuid]: val }));

const fakeChannel = dataStream({ $scope, type: 'proposal' });

let index = 0;

const proposalResponseList = Object.entries(expectedToReceiveProposals).map(([u, p]) => ({ [u]: p }));

api.subscribeToPriceForContractProposal = ({ passthrough }) =>
    api.events.emit('proposal', expectedToReceiveProposals[passthrough.uuid]);

api.unsubscribeByID = jest.fn();

describe('proposal subscription integration', () => {
    it('should put RECEIVE ALL PROPOSALS', () =>
        expectSaga(proposal, { tradeOption, $scope })
            .provide([
                [matchers.call.fn(tradeOptionToProposal), proposalRequests],
                [matchers.call.fn(dataStream), fakeChannel],
                [matchers.call.fn(dataStream), fakeChannel],
                [select(selectors.forgottenProposals), {}],
                [select(selectors.receivedProposals), receivedProposals],
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
            .put(proposalInfo({ itemName: properties.FORGOTTEN_PROPOSAL, payload: { uuidOld1: '' } }))
            .put(proposalInfo({ itemName: properties.FORGOTTEN_PROPOSAL, payload: { uuidOld2: '' } }))
            .put(proposalInfo({ itemName: properties.FORGOTTEN_PROPOSAL, payload: uuidOld1, meta: { remove: true } }))
            .put(proposalInfo({ itemName: properties.FORGOTTEN_PROPOSAL, payload: uuidOld2, meta: { remove: true } }))
            .put(proposalInfo({ itemName: properties.RECEIVED_PROPOSAL, payload: proposalResponseList[0] }))
            .put(proposalInfo({ itemName: properties.RECEIVED_PROPOSAL, payload: proposalResponseList[1] }))
            .put(proposalInfo({ itemName: properties.RECEIVED_PROPOSAL, payload: uuidOld1, meta: { remove: true } }))
            .put(proposalInfo({ itemName: properties.RECEIVED_PROPOSAL, payload: uuidOld2, meta: { remove: true } }))
            .put(proposalInfo({ itemName: properties.REQUESTED_PROPOSAL, payload: requestProposalsList[0] }))
            .put(proposalInfo({ itemName: properties.REQUESTED_PROPOSAL, payload: requestProposalsList[1] }))
            .put(proposalInfo({ itemName: properties.REQUESTED_PROPOSAL, payload: uuidOld1, meta: { remove: true } }))
            .put(proposalInfo({ itemName: properties.REQUESTED_PROPOSAL, payload: uuidOld2, meta: { remove: true } }))
            .put(receiveAllProposals())
            .run());
});
