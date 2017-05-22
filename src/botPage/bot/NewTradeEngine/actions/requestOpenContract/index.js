import { doUntilDone } from '../../../tools';
import * as actions from '../../constants/actions';

const requestOpenContract = contractId => (dispatch, getState, { api }) => {
    api.events.on('proposal_open_contract', r => {
        const contract = r.proposal_open_contract;
        const { contract_id: responseContractId } = contract;

        if (responseContractId === contractId) {
            dispatch({ type: actions.RECEIVE_OPEN_CONTRACT, data: contract });
        }
    });

    // send request for proposal open contract if above failed within 1 sec
    api.events.on('transaction', t => {
        const { contract_id: responseContractId, action } = t.transaction;

        if (responseContractId !== contractId || action !== 'sell') {
            return;
        }

        setTimeout(() => {
            const { contractId: currentContractId } = getState();
            if (contractId !== currentContractId) {
                doUntilDone(() => api.getContractInfo(contractId));
            }
        }, 1000);
    });

    api.subscribeToOpenContract(contractId);
    api.subscribeToTransactions();
};

export default requestOpenContract;
