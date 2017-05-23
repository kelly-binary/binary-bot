import * as matchers from 'redux-saga-test-plan/matchers';
import { expectSaga } from 'redux-saga-test-plan';
import createScope from '../createScope';
import dataStream from '../../dataStream';
import tick from './';

describe('tick channel', () => {
    const $scope = createScope();
    const fakeChannel = dataStream({ $scope, type: 'tick' });
    const epoch = 123456;
    const ticks = [{ epoch, quote: '1' }, { epoch: epoch + 1, quote: '2' }];

    it('should put NEW_TICK with lastTick', () =>
        expectSaga(tick, { $scope })
            .provide([
                [matchers.call(dataStream, { $scope, type: 'tick' }), fakeChannel],
                {
                    take({ channel }, next) {
                        if (channel === fakeChannel) {
                            return ticks.shift();
                        }
                        return next();
                    },
                },
            ])
            .put({ type: 'NEW_TICK', payload: { lastTick: epoch } })
            .put({ type: 'NEW_TICK', payload: { lastTick: epoch + 1 } })
            .run());
});
