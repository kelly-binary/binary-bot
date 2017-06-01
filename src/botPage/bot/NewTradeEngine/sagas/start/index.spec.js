import { testSaga } from 'redux-saga-test-plan';
import * as actions from '../../constants/actions';
import * as states from '../../constants/states';
import * as selectors from '../selectors';
import handleForgottenProposal from '../proposal/handleForgottenProposal';
import handleProposalSubscription from '../proposal/handleProposalSubscription';
import start from './';

const twoContracts = {
    contractTypes: ['PUT', 'CALL'],
};
const oneContract = {
    contractTypes: ['PUT'],
};

const proposalID1 = 'proposalID1';
const proposalID2 = 'proposalID2';
const proposal1 = { id: '0' };
const proposal2 = { id: '1' };
const payload = { [proposalID1]: proposal1, [proposalID2]: proposal2 };
const $scope = {};

describe('start saga', () => {
    it('should not have any effect if it\'s not INITIALIZED', () => {
        testSaga(start, { $scope, twoContracts })
            .next()
            .select(selectors.stageSelector)
            .next(states.STOPPED)
            .put({ type: actions.START, payload: twoContracts })
            .next()
            .isDone();
    });
    it('should not start if it\'s the same trade option', () => {
        testSaga(start, { $scope, oneContract })
            .next()
            .select(selectors.stageSelector)
            .next(states.INITIALIZED)
            .select(selectors.tradeOptionSelector)
            .next(oneContract)
            .put({ type: actions.START, payload: oneContract })
            .next()
            .isDone();
    });
    it('should forget existing proposals and request for new proposals', () => {
        testSaga(start, { $scope, oneContract })
            .next()
            .select(selectors.stageSelector)
            .next(states.INITIALIZED)
            .select(selectors.tradeOptionSelector)
            .next(twoContracts)
            .put({ type: actions.START, payload: oneContract })
            .next()
            .select(selectors.proposalsSelector)
            .next(payload)
            .fork(handleForgottenProposal, { $scope, proposalID: proposalID1 })
            .next()
            .fork(handleForgottenProposal, { $scope, proposalID: proposalID2 })
            .next()
            .fork(handleProposalSubscription, oneContract)
            .next()
            .isDone();
    });
});
