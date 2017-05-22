import { translate } from '../../../../../common/i18n';
import { doUntilDone } from '../../../tools';
import * as actions from '../../constants/actions';

const selectProposal = (proposals, contractType) => {
    if (!proposals.length) {
        throw translate('Proposals are not ready');
    }

    const toBuy = proposals.find(proposal => proposal.contractType === contractType);

    if (!toBuy) {
        throw translate('Selected proposal does not exist');
    }

    return {
        id      : toBuy.id,
        askPrice: toBuy.ask_price,
    };
};

const purchase = contractType => async (dispatch, getState, { api }) => {
    const { proposals } = getState();

    const { id, askPrice } = selectProposal(proposals, contractType);

    const { buy: { contract_id: contractId } } = await doUntilDone(() => api.buyContract(id, askPrice));

    dispatch({ type: actions.PURCHASE_SUCCESSFULLY, data: contractId });
};

export default purchase;
