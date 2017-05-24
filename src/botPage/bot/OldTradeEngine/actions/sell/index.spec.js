import { createScope } from '../../../CliTools';
import * as actions from '../../constants/actions';
import * as states from '../../constants/states';
import { toBeCalledWithAsync } from '../tools';
import sell from './';

describe('sell action', () => {
    it('Should SELL_SUCCESSFUL', async () => {
        const $scope = createScope();
        const { api } = $scope;

        await api.authorize('Xkq6oGFEHh6hJH8');
        const { proposal: { id, ask_price: askPrice } } = await api.subscribeToPriceForContractProposal({
            amount       : '1.00',
            basis        : 'stake',
            contract_type: 'CALL',
            currency     : 'USD',
            duration     : 5,
            duration_unit: 'h',
            symbol       : 'R_100',
        });

        const { buy: { contract_id: contractId } } = await api.buyContract(id, askPrice);

        await api.subscribeToOpenContract(contractId);

        await toBeCalledWithAsync({
            $scope,
            action: sell,
            arg   : contractId,
            state : {
                stage: states.OPEN_CONTRACT,
                contractId,
            },
            calledWith: expect.objectContaining({
                type: actions.SELL_SUCCESSFULLY,
            }),
        });
    });
});
