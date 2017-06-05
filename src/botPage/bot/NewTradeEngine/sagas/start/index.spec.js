import { testSaga } from 'redux-saga-test-plan';
import * as actions from '../../constants/actions';
import * as states from '../../constants/states';
import * as selectors from '../selectors';
import handleProposalSubscription from './handleProposalSubscription';
import start from './';
import { tradeOptionToProposal } from '../../../tools';

const twoContracts = {
    contractTypes: ['PUT', 'CALL'],
    amount       : 12.00,
};
const oneContract = {
    contractTypes: ['PUT'],
    amount       : 1,
};

const $scope = {};

const uuids = ['uuid1', 'uuid2'];
const proposalRequests = tradeOptionToProposal(oneContract);
const proposals = proposalRequests.map((request, i) => ({ request, uuid: uuids[i] }));

describe('start saga', () => {
    it('should not have any effect if it\'s not INITIALIZED', () => {
        testSaga(start, { $scope, tradeOption: twoContracts })
            .next()
            .select(selectors.stage)
            .next(states.STOPPED)
            .put({ type: actions.START, payload: twoContracts })
            .next()
            .isDone();
    });
    it('should not start if it\'s the same trade option', () => {
        testSaga(start, { $scope, tradeOption: oneContract })
            .next()
            .select(selectors.stage)
            .next(states.INITIALIZED)
            .select(selectors.tradeOption)
            .next(oneContract)
            .put({ type: actions.START, payload: oneContract })
            .next()
            .isDone();
    });
    it('should forget existing proposals and request for new proposals', () => {
        testSaga(start, { $scope, tradeOption: oneContract })
            .next()
            .select(selectors.stage)
            .next(states.INITIALIZED)
            .select(selectors.tradeOption)
            .next(twoContracts)
            .put({ type: actions.START, payload: oneContract })
            .next()
            .call(tradeOptionToProposal, oneContract)
            .next(proposals)
            .fork(handleProposalSubscription, { proposals, $scope })
            .next()
            .isDone();
    });
});
