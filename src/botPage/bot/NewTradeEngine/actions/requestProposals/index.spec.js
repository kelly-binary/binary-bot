import { toBeCalledWithAsync } from '../tools';
import * as actions from '../../constants/actions';
import * as states from '../../constants/states';
import requestProposals from './';

describe('requestProposals action', () => {
    it('should UPDATE_PROPOSAL', async () => {
        await toBeCalledWithAsync({
            action: requestProposals,
            arg   : {
                candleInterval: 60,
                contractTypes : ['CALL', 'PUT'],
                symbol        : 'R_100',
                amount        : 1,
                currency      : 'USD',
                duration      : 5,
                duration_unit : 't',
            },
            state     : { proposalStage: states.WAITING_FOR_TWO_PROPOSALS },
            calledWith: {
                type: actions.UPDATE_PROPOSAL,
                data: expect.objectContaining({
                    ask_price    : expect.any(String),
                    date_start   : expect.any(String),
                    display_value: expect.any(String),
                    id           : expect.any(String),
                    longcode     : expect.any(String),
                    payout       : expect.any(String),
                    spot         : expect.any(String),
                    spot_time    : expect.any(String),
                    contractType : expect.any(String),
                }),
            },
        });
    });
});
