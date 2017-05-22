import { doUntilDone } from '../../../tools';
import * as actions from '../../constants/actions';

const requestBalance = token => (dispatch, getState, { api }) => {
    const { balance: { balance } } = getState();

    if (balance) {
        return;
    }

    const authPromise = new Promise(r => api.events.on('authorize', r));

    api.events.on('balance', r => {
        const { balance: { balance: b, currency } } = r;

        dispatch({ type: actions.BALANCE_RECEIVED, data: { balance: Number(b).toFixed(2), currency } });
    });

    doUntilDone(() => api.authorize(token)).catch(e => {
        throw e;
    });

    authPromise.then(() =>
        doUntilDone(() => api.subscribeToBalance()).catch(e => {
            throw e;
        })
    );
};

export default requestBalance;
