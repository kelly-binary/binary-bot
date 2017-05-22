import createStore from '../../createStore';
import * as states from '../../constants/states';
import * as actions from '../../constants/actions';
import starter from './';

describe('Starter actor', () => {
    it('should not have any effect if is not INITIALIZED', async () => {
        const store = createStore();
        const data = { contractTypes: ['CALL', 'PUT'] };
        await starter({ data, store });
        const { stage } = store.getState();
        expect(stage).toEqual(states.STOPPED);
    });
    it('should initProposals and START', async () => {
        const store = createStore();
        const initData = { initOptions: { symbol: 'R_100' } };
        store.dispatch({ type: actions.INITIALIZE, data: initData });
        const data = { contractTypes: ['CALL', 'PUT'] };
        await starter({ data, store });
        const { stage, proposalStage, tradeOption } = store.getState();
        expect(stage).toEqual(states.STARTED);
        expect(proposalStage).toEqual(states.WAITING_FOR_TWO_PROPOSALS);
        expect(tradeOption).toEqual({ ...data, ...initData.initOptions });
    });
});
