import Bot from './';
import * as actions from './constants/actions';
import * as states from './constants/states';

const $scope = {};
const bot = new Bot($scope);
const token = '123';
const initData = { token, amount: 1 };
const store = {
    dispatch : jest.fn(),
    subscribe: f => {
        f();
        return () => {};
    },
    getState: () => ({
        stage : states.INITIALIZED,
        initData,
        before: { timestamp: 1, value: true },
    }),
};
bot.store = store;
const initOption = {};
const startOption = { amount: 1 };

describe('Bot API', () => {
    it('should dispatch INIT_SAGA', async () => {
        const value = await bot.init(token, initOption);
        expect(bot.store.dispatch).toBeCalledWith({ type: actions.INIT_SAGA, payload: { token, initOption, $scope } });
        expect(value).toEqual(true);
    });
    it('should dispatch START_SAGA', () => {
        bot.start(startOption);
        expect(bot.store.dispatch).toBeCalledWith({
            type   : actions.START_SAGA,
            payload: { $scope, tradeOption: { ...startOption, ...initData } },
        });
    });
    it('should return a promise that resolves true by changes in watchName with value == true', async () => {
        store.subscribe = f => {
            setTimeout(() => {
                store.getState = () => ({ before: { timestamp: 3, value: true } });
                f();
            }, 1000);
            return () => {};
        };
        const value = await bot.watch('before');
        expect(value).toEqual(true);
    });
    it('should return a promise that resolves false by changes in watchName with value == false', async () => {
        store.subscribe = f => {
            setTimeout(() => {
                store.getState = () => ({ before: { timestamp: 4, value: false } });
                f();
            }, 1000);
            return () => {};
        };
        const value = await bot.watch('before');
        expect(value).toEqual(false);
    });
});
