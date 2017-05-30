import * as matchers from 'redux-saga-test-plan/matchers';
import { expectSaga } from 'redux-saga-test-plan';
import * as actions from '../../constants/actions';
import createScope from '../createScope';
import dataStream from '../dataStream';
import tick from './';

const $scope = createScope();
const symbol = 'R_100';
const arg = { $scope, type: 'tick', symbol };
const fakeChannel = dataStream(arg);
const epoch = 123456;
const ticks = [{ epoch, quote: '1' }, { epoch: epoch + 1, quote: '2' }];

describe('tick channel integration', () => {
    it('should put NEW_TICK with lastTick', () =>
        expectSaga(tick, { $scope, symbol })
            .provide([
                [matchers.call(dataStream, arg), fakeChannel],
                {
                    take({ channel }, next) {
                        if (channel === fakeChannel) {
                            return ticks.shift();
                        }
                        return next();
                    },
                },
            ])
            .put({ type: actions.NEW_TICK, payload: epoch })
            .put({ type: actions.NEW_TICK, payload: epoch + 1 })
            .run());
});
