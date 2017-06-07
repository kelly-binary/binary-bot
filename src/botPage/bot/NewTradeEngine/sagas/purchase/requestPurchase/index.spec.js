import createScope from '../../createScope';
import requestPurchase from './';

const $scope = createScope();

const { api } = $scope;

api.buyContract = jest.fn();

const id = 'id1';
const askPrice = 1;

const proposal = {
    id,
    askPrice,
};

describe('requestPurchase', () => {
    it('should request purchase for the given proposal', async () => {
        await requestPurchase({ $scope, proposal });
        expect(api.buyContact).toBeCalledWith(id, askPrice);
    });
});
