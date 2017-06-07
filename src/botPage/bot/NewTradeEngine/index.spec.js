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
        stage             : states.INITIALIZED,
        initData,
        waitingForPurchase: { timestamp: 1, stayInsideScope: true },
    }),
};
bot.store = store;
const initOption = {};
const startOption = { amount: 1 };
const contractType = 'CALL';

describe('Bot API', () => {
    it('should dispatch INIT_SAGA', async () => {
        const stayInsideScope = await bot.init(token, initOption);
        expect(bot.store.dispatch).toBeCalledWith({ type: actions.INIT_SAGA, payload: { token, initOption, $scope } });
        expect(stayInsideScope).toEqual(true);
    });
    it('should dispatch START_SAGA', () => {
        bot.start(startOption);
        expect(bot.store.dispatch).toBeCalledWith({
            type   : actions.START_SAGA,
            payload: { $scope, tradeOption: { ...startOption, ...initData } },
        });
    });
    it('should resolve true by changes in [watchName] timestamp when stayInsideScope == true', async () => {
        store.subscribe = f => {
            setTimeout(() => {
                store.getState = () => ({ waitingForPurchase: { timestamp: 3, stayInsideScope: true } });
                f();
            }, 1000);
            return () => {};
        };
        const stayInsideScope = await bot.watch('before');
        expect(stayInsideScope).toEqual(true);
    });
    it('should resolve false by changes in [watchName] timestamp when stayInsideScope == false', async () => {
        store.subscribe = f => {
            setTimeout(() => {
                store.getState = () => ({ waitingForPurchase: { timestamp: 4, stayInsideScope: false } });
                f();
            }, 1000);
            return () => {};
        };
        const stayInsideScope = await bot.watch('before');
        expect(stayInsideScope).toEqual(false);
    });
    it('should dispatch PURCHASE_SAGA with a contract type and scope', () => {
        bot.purchase(contractType);
        expect(bot.store.dispatch).toBeCalledWith({ type: actions.PURCHASE_SAGA, payload: { $scope, contractType } });
    });
});
