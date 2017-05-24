import { createScope } from '../../../CliTools';
import createStoreWithScope from '../../createStoreWithScope';
import createStore from '../../createStore';
import * as states from '../../constants/states';
import * as actions from '../../constants/actions';
import purchaser from './';

describe('purchaser actor', () => {
    it('should not run if not PROPOSALS_READY', async () => {
        const store = createStore();
        await purchaser({ store, data: {} });
        const { stage } = store.getState();
        expect(stage).toEqual(states.STOPPED);
    });
    it('should try to purchase then PURCHASE_SUCCESSFULLY', async () => {
        const $scope = createScope();
        const { api } = $scope;
        const store = createStoreWithScope($scope);
        await api.authorize('Xkq6oGFEHh6hJH8');
        const { proposal } = await api.subscribeToPriceForContractProposal({
            amount       : '1.00',
            basis        : 'stake',
            contract_type: 'CALL',
            currency     : 'USD',
            duration     : 5,
            duration_unit: 't',
            symbol       : 'R_100',
        });

        store.dispatch({
            type: actions.RECEIVE_PROPOSALS,
        });
        store.dispatch({
            type: actions.UPDATE_PROPOSAL,
            data: {
                ...proposal,
                contractType: 'CALL',
            },
        });
        const successfulPurchase = purchaser({ data: 'CALL', store });
        const { stage: beforeSuccess } = store.getState();
        expect(beforeSuccess).toEqual(states.PURCHASING);
        await successfulPurchase;
        const { stage: afterSuccess } = store.getState();
        expect(afterSuccess).toEqual(states.SUCCESSFUL_PURCHASE);
    });
});
