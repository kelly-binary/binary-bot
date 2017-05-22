import { createScope } from '../../../CliTools';
import { toBeCalledWithAsync } from '../tools';
import * as actions from '../../constants/actions';
import * as states from '../../constants/states';
import requestOpenContract from './';

describe('requestOpenContract action', () => {
    it('Should request for open contract', async () => {
        const $scope = createScope();
        const { api } = $scope;

        await api.authorize('Xkq6oGFEHh6hJH8');

        const { proposal: { id, ask_price: askPrice } } = await api.subscribeToPriceForContractProposal({
            amount       : '1.00',
            basis        : 'stake',
            contract_type: 'CALL',
            currency     : 'USD',
            duration     : 5,
            duration_unit: 't',
            symbol       : 'R_100',
        });

        const { buy: { contract_id: contractId } } = await api.buyContract(id, askPrice);

        await toBeCalledWithAsync({
            $scope,
            action    : requestOpenContract,
            arg       : contractId,
            state     : { stage: states.SUCCESSFUL_PURCHASE },
            calledWith: {
                type: actions.RECEIVE_OPEN_CONTRACT,
                data: expect.any(Object),
            },
        });
    });
});
