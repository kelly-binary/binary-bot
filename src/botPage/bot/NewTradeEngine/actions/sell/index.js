import { doUntilDone } from '../../../tools';
import * as actions from '../../constants/actions';

const sell = contractId => async (dispatch, getState, { api }) => {
    await doUntilDone(() => api.sellContract(contractId, 0));

    dispatch({ type: actions.SELL_SUCCESSFULLY });
};

export default sell;
