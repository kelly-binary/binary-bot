import createStore from '../../createStore';
import * as actions from '../../constants/actions';
import watcher from './';

describe('watcher actor', () => {
    describe('watching before', () => {
        it('should wait for PROPOSALS_READY and NEW_TICK if STARTED', async () => {
            const store = createStore();
            store.dispatch({ type: actions.START, data: {} });
            setTimeout(() => {
                store.dispatch({ type: actions.RECEIVE_PROPOSALS, data: {} });
                store.dispatch({ type: actions.NEW_TICK, data: 1 });
            }, 1000);
            const shouldContinue = await watcher({ store, name: 'before' });
            expect(shouldContinue).toEqual(true);
        });
        it('should immediately resolve if PROPOSALS_READY and new NEW_TICK', async () => {
            const store = createStore();
            store.dispatch({ type: actions.START, data: {} });
            store.dispatch({ type: actions.NEW_TICK, data: 1 });
            store.dispatch({ type: actions.RECEIVE_PROPOSALS, data: {} });
            setTimeout(() => {
                store.dispatch({ type: actions.NEW_TICK, data: 2 });
            }, 1000);
            const shouldContinue = await watcher({ store, name: 'before' });
            expect(shouldContinue).toEqual(true);
        });
        it('should resolve with false if not PROPOSALS_READY or STARTED', async () => {
            const store = createStore();
            const shouldContinue = await watcher({ store, name: 'before' });
            expect(shouldContinue).toEqual(false);
        });
    });
    describe('watching during', () => {
        it('should wait for OPEN_CONTRACT if SUCCESSFUL_PURCHASE', async () => {
            const store = createStore();
            store.dispatch({ type: actions.PURCHASE_SUCCESSFULLY, data: {} });
            setTimeout(() => {
                store.dispatch({ type: actions.RECEIVE_OPEN_CONTRACT, data: {} });
            }, 1000);
            const shouldContinue = await watcher({ store, name: 'during' });
            expect(shouldContinue).toEqual(true);
        });
        it('should resolve with true if OPEN_CONTRACT and new contract and not sold', async () => {
            const store = createStore();
            store.dispatch({ type: actions.RECEIVE_OPEN_CONTRACT, data: { is_sold: 0 } });
            setTimeout(() => {
                store.dispatch({ type: actions.RECEIVE_OPEN_CONTRACT, data: { is_sold: 0 } });
            }, 1000);
            const shouldContinue = await watcher({ store, name: 'during' });
            expect(shouldContinue).toEqual(true);
        });
        it('should resolve with false if sold', async () => {
            const store = createStore();
            store.dispatch({ type: actions.RECEIVE_OPEN_CONTRACT, data: { is_sold: 0 } });
            setTimeout(() => {
                store.dispatch({ type: actions.RECEIVE_OPEN_CONTRACT, data: { is_sold: 1 } });
            }, 1000);
            const shouldContinue = await watcher({ store, name: 'during' });
            expect(shouldContinue).toEqual(false);
        });
        it('should resolve with false otherwise', async () => {
            const store = createStore();
            const shouldContinue = await watcher({ store, name: 'during' });
            expect(shouldContinue).toEqual(false);
        });
    });
});
