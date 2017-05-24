import createStore from '../../createStore';
import * as actions from '../../constants/actions';
import * as states from '../../constants/states';
import initializer from './';

describe('Initializer actor', () => {
    it('should run only if STOPPED', async () => {
        const store = createStore();
        store.dispatch({ type: actions.START, data: {} });
        const data = { token: 'Xkq6oGFEHh6hJH8', initOptions: { symbol: 'R_100' } };
        await initializer({ data, store });
        const { stage } = store.getState();
        expect(stage).toEqual(states.STARTED);
    });
    it('should requestTicks and requestBalance, then should INITIALIZE', async () => {
        const store = createStore();
        const data = { token: 'Xkq6oGFEHh6hJH8', initOptions: { symbol: 'R_100' } };
        await initializer({ data, store });
        const { stage, initData } = store.getState();
        expect(stage).toEqual(states.INITIALIZED);
        expect(initData).toEqual(data);
    });
});
