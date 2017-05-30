import * as selectors from './';

const state = {
    stage      : 'stage',
    tradeOption: {
        contractTypes: ['CALL'],
    },
};

describe('stage selector', () => {
    it('should select stage', () => {
        expect(selectors.stageSelector(state)).toEqual(state.stage);
    });
});

describe('tradeOptionSelector selector', () => {
    it('should select tradeOption', () => {
        expect(selectors.tradeOptionSelector(state)).toEqual(state.tradeOption);
    });
});

describe('lastTick selector', () => {
    it('should select lastTick', () => {
        expect(selectors.lastTickSelector(state)).toEqual(state.lastTick);
    });
});
