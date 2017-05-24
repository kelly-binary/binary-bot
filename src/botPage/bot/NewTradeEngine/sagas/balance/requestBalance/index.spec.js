import createScope from '../../createScope';
import requestBalance from './';

const $scope = createScope();

const { api } = $scope;

const expectedBalance = {
    balance : '12.00',
    currency: 'USD',
};

const error = Error('some error');

api.authorize = token => {
    if (token === 'ValidToken') {
        return Promise.resolve();
    }
    return Promise.reject(error);
};

api.subscribeToBalance = () => {
    api.events.emit('balance', expectedBalance);
};

describe('request balance function', () => {
    it('should take token and emit balance', async () => {
        requestBalance({ $scope, token: 'ValidToken' });
        const balance = await new Promise(resolve => api.events.on('balance', resolve));
        expect(balance).toEqual(expectedBalance);
    });

    it('should reject if token is invalid', async () => {
        try {
            await requestBalance({ $scope, token: 'InvalidToken' });
        } catch (e) {
            expect(e).toEqual(error);
        }
    });
});
