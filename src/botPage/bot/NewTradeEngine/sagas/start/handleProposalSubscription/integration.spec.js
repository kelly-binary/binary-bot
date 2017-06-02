import { expectSaga } from 'redux-saga-test-plan';
import { select } from 'redux-saga/effects';
import handleProposalSubscription from './';
import * as actions from '../../../constants/actions';
import * as selectors from '../../selectors';
import createScope from '../../createScope';
// import { tradeOptionToProposal} from '../../../../tools'

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

const requestedProposals = [];

api.subscribeToPriceForContractProposal = proposal => {
    requestedProposals.push(proposal);
    api.events.emit('proposal', expectedToReceivedProposals[proposal.passthrough.uuid]);
};

describe('proposal subscription integration', () => {
    it('should put RECEIVE ALL PROPOSALS', () => {
        expectSaga(handleProposalSubscription, { tradeOption, $scope, uuids })
            .provide([
                [select(selectors.forgottenProposals), {}],
                [select(selectors.receivedProposals), {}],
                [select(selectors.requestedProposals), requestedProposals],
            ])
            .put({ type: actions.RECEIVE_ALL_PROPOSALS })
            .run();
    });
});
