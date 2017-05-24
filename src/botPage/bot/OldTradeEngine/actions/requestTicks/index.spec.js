import * as actions from '../../constants/actions';
import { toBeCalledWithAsync, notToBeCalled } from '../tools';
import requestTicks from './';

describe('requestTicks action', () => {
    it('should not be called if symbol exists', () => {
        notToBeCalled({
            action: requestTicks,
            arg   : 'R_100',
            state : { initData: { symbol: 'R_100' } },
        });
    });
    it('Should call the dispatch function in the future', async () => {
        await toBeCalledWithAsync({
            action    : requestTicks,
            arg       : 'R_100',
            state     : { initData: { symbol: 'R_10' } },
            calledWith: expect.objectContaining({
                type: actions.NEW_TICK,
                data: expect.any(Number),
            }),
        });
    });
});
