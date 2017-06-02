import * as selectors from './';

const state = {
    stage      : 'stage',
    tradeOption: {
        contractTypes: ['CALL'],
    },
    proposalInfo: {
        receivedProposals: {},
    },
};

describe('selectors', () => {
    it('should select stage', () => {
        expect(selectors.stageSelector(state)).toEqual(state.stage);
    });

    it('should select tradeOption', () => {
        expect(selectors.tradeOptionSelector(state)).toEqual(state.tradeOption);
    });

    it('should select lastTick', () => {
        expect(selectors.lastTickSelector(state)).toEqual(state.lastTick);
    });

    it('should select receivedProposals from proposalInfo', () => {
        expect(selectors.proposalsSelector(state)).toEqual(state.proposalInfo.receivedProposals);
    });

    it('should select forgottenProposals from proposalInfo', () => {
        expect(selectors.forgottenProposalsSelector(state)).toEqual(state.proposalInfo.receivedProposals);
    });
});
