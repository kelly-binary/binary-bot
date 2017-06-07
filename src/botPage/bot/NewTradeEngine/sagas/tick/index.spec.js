import { testSaga } from 'redux-saga-test-plan';
import { eventChannel } from 'redux-saga';
import dataStream from '../dataStream';
import tickLoop from './tickLoop';
import tick from './';

const $scope = {};
const symbol = 'R_100';
const fakeChannel = eventChannel(() => () => {});

describe('tick saga', () => {
    it('should initiate tickLoop', () => {
        testSaga(tick, { $scope, symbol })
            .next()
            .call(dataStream, { $scope, symbol, type: 'tick' })
            .next(fakeChannel)
            .spawn(tickLoop, fakeChannel)
            .next()
            .isDone();
    });
});
