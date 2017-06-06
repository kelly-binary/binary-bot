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
        before: { timestamp: 1, stayInsideTheScope: true },
    }),
};
bot.store = store;
const initOption = {};
const startOption = { amount: 1 };

describe('Bot API', () => {
    it('should dispatch INIT_SAGA', async () => {
        const stayInsideTheScope = await bot.init(token, initOption);
        expect(bot.store.dispatch).toBeCalledWith({ type: actions.INIT_SAGA, payload: { token, initOption, $scope } });
        expect(stayInsideTheScope).toEqual(true);
    });
    it('should dispatch START_SAGA', () => {
        bot.start(startOption);
        expect(bot.store.dispatch).toBeCalledWith({
            type   : actions.START_SAGA,
            payload: { $scope, tradeOption: { ...startOption, ...initData } },
        });
    });
    it('should resolve true by changes in [watchName] timestamp when stayInsideTheScope == true', async () => {
        store.subscribe = f => {
            setTimeout(() => {
                store.getState = () => ({ before: { timestamp: 3, stayInsideTheScope: true } });
                f();
            }, 1000);
            return () => {};
        };
        const stayInsideTheScope = await bot.watch('before');
        expect(stayInsideTheScope).toEqual(true);
    });
    it('should resolve false by changes in [watchName] timestamp when stayInsideTheScope == false', async () => {
        store.subscribe = f => {
            setTimeout(() => {
                store.getState = () => ({ before: { timestamp: 4, stayInsideTheScope: false } });
                f();
            }, 1000);
            return () => {};
        };
        const stayInsideTheScope = await bot.watch('before');
        expect(stayInsideTheScope).toEqual(false);
    });
});
