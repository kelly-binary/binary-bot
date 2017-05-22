import { createScope } from '../../../CliTools';
import createStoreWithScope from '../../createStoreWithScope';
import createStore from '../../createStore';
import * as states from '../../constants/states';
import * as actions from '../../constants/actions';
import seller from './';

const sleep = milisec => new Promise(resolve => setTimeout(resolve, milisec));

describe('seller actor', () => {
    it('should do nothing if not OPEN_CONTRACT', async () => {
        const store = createStore();
        await seller({ store });

        const { stage } = store.getState();
        expect(stage).toEqual(states.STOPPED);
    });
    it('should try to sell then SELL_SUCCESSFULLY', async () => {
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
            duration_unit: 'h',
            symbol       : 'R_100',
        });

        const { buy: { contract_id: contractId } } = await api.buyContract(id, askPrice);

        store.dispatch({
            type: actions.PURCHASE_SUCCESSFULLY,
            data: contractId,
        });

        store.dispatch({
            type: actions.RECEIVE_OPEN_CONTRACT,
            data: {},
        });
        // wait for sell available signal!
        await sleep(1000);
        await seller({ store });
        const { stage } = store.getState();
        expect(stage).toEqual(states.INITIALIZED);
    });
});
