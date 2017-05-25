import { takeEvery } from 'redux-saga/effects';
import { testSaga } from 'redux-saga-test-plan';
import * as actions from '../constants/actions';
import error from './error';
import init from './init';
import customTakeEvery from './customTakeEvery';
import rootSaga from './';

describe('root saga', () => {
    it('should fork all sagas', () => {
        testSaga(rootSaga)
            .next()
            .inspect(fn => expect(fn).toEqual(takeEvery('*', error)))
            .next()
            .inspect(fn => expect(fn).toEqual(customTakeEvery(actions.INIT_SAGA, init)));
    });
});
