import * as actions from '../../constants/actions';
import * as states from '../../constants/states';
import requestTicks from '../../actions/requestTicks';
import requestBalance from '../../actions/requestBalance';
import waitForCondition from '../waitForCondition';

const initializer = async ({ data, store }) => {
    const { stage } = store.getState();
    if (stage !== states.STOPPED) {
        return;
    }
    const { token, initOptions: { symbol } } = data;
    store.dispatch(requestTicks(symbol));
    store.dispatch(requestBalance(token));
    await waitForCondition(store, state => Number(state.lastTick) > 0 && Number(state.balance.balance) > 0);
    store.dispatch({ type: actions.INITIALIZE, data });
};

export default initializer;
