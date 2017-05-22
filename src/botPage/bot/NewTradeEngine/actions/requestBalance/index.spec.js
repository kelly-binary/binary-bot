import { toBeCalledWithAsync, notToBeCalled } from '../tools';
import * as actions from '../../constants/actions';
import requestBalance from './';

describe('requestBalance action', () => {
    it('should not be called if balance exists', () => {
        notToBeCalled({
            action: requestBalance,
            arg   : 'Xkq6oGFEHh6hJH8',
            state : { balance: { balance: '12.00' } },
        });
    });
    it('Should dispatch the current balance', async () => {
        await toBeCalledWithAsync({
            action    : requestBalance,
            arg       : 'Xkq6oGFEHh6hJH8',
            state     : { balance: {} },
            calledWith: {
                type: actions.BALANCE_RECEIVED,
                data: expect.objectContaining({
                    balance : expect.any(String),
                    currency: expect.any(String),
                }),
            },
        });
    });
});
