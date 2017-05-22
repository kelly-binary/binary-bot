import * as actions from '../../constants/actions';

let tickListenerKey;

const requestTicks = symbol => (dispatch, getState, { ticksService }) => {
    const { initData: { symbol: currentSymbol } } = getState();
    if (!symbol || currentSymbol === symbol) {
        return;
    }

    ticksService.stopMonitor({
        symbol: currentSymbol,
        key   : tickListenerKey,
    });

    const key = ticksService.monitor({
        symbol,
        callback(ticks) {
            const [{ epoch: data }] = ticks.slice(-1);
            dispatch({ type: actions.NEW_TICK, data });
        },
    });

    tickListenerKey = key;
};

export default requestTicks;
