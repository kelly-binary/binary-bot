import { takeEvery } from 'redux-saga/effects';
import { testSaga } from 'redux-saga-test-plan';
import * as actions from '../constants/actions';
import customTakeEvery from './customTakeEvery';
import error from './error';
import init from './init';
import start from './start';
import newTickWatcher from './watchers/newTickWatcher';
import purchase from './purchase';
import rootSaga from './';

describe('root saga', () => {
    it('should spawn all sagas', () => {
        testSaga(rootSaga)
            .next()
            .inspect(fn => expect(fn).toEqual(takeEvery('*', error)))
            .next()
            .inspect(fn => expect(fn).toEqual(customTakeEvery(actions.INIT_SAGA, init)))
            .next()
            .inspect(fn => expect(fn).toEqual(customTakeEvery(actions.START_SAGA, start)))
            .next()
            .inspect(fn => expect(fn).toEqual(customTakeEvery(actions.NEW_TICK, newTickWatcher)))
            .next()
            .inspect(fn => expect(fn).toEqual(customTakeEvery(actions.PURCHASE_SAGA, purchase)))
            .next()
            .isDone();
    });
});
