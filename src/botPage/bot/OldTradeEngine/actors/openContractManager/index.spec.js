import { createScope } from '../../../CliTools';
import createStoreWithScope from '../../createStoreWithScope';
import createStore from '../../createStore';
import * as states from '../../constants/states';
import * as actions from '../../constants/actions';
import openContractManager from './';

describe('openContractManager actor', () => {
    it('should not run if not SUCCESSFUL_PURCHASE', async () => {
        const store = createStore();
        await openContractManager({ store });
        const { stage } = store.getState();
        expect(stage).toEqual(states.STOPPED);
    });
    it('should request for open contract using contractId', async () => {
        const $scope = createScope();
        const { api } = $scope;
        const store = createStoreWithScope($scope);
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
        store.dispatch({
            type: actions.PURCHASE_SUCCESSFULLY,
            data: contractId,
        });
        await openContractManager({ store });
        const { stage } = store.getState();
        expect(stage).toEqual(states.OPEN_CONTRACT);
    });
});
