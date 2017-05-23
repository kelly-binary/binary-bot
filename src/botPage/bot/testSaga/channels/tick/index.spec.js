import * as matchers from 'redux-saga-test-plan/matchers';
import { expectSaga } from 'redux-saga-test-plan';
import createScope from '../createScope';
import dataStream from '../../dataStream';
import tick from './';

describe('tick channel', () => {
    const $scope = createScope();
    const fakeChannel = dataStream({ $scope, type: 'tick' });
    const epoch = 123456;

    it('should put NEW_TICK with lastTick', () =>
        expectSaga(tick, { $scope })
            .provide([
                [matchers.call.fn(dataStream), fakeChannel],
                {
                    take({ channel }, next) {
                        if (channel === fakeChannel) {
                            return { epoch };
                        }
                        return next();
                    },
                },
            ])
            .put({ type: 'NEW_TICK', payload: { lastTick: epoch } })
            .run());
});
