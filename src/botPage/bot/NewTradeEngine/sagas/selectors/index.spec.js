import { stageSelector, tradeOptionSelector } from './';

const state = {
    stage      : 'stage',
    tradeOption: {
        contractTypes: ['CALL'],
    },
};

describe('stage selector', () => {
    it('should select stage', () => {
        expect(stageSelector(state)).toEqual(state.stage);
    });
});

describe('tradeOptionSelector selector', () => {
    it('should select tradeOption', () => {
        expect(tradeOptionSelector(state)).toEqual(state.tradeOption);
    });
});
