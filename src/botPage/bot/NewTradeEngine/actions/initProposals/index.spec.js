import { toBeCalledWith, notToBeCalled } from '../tools';
import * as actions from '../../constants/actions';
import initProposals from './';

describe('initProposals action', () => {
    const tradeOption = { contractTypes: ['CALL'] };
    it('should not do anything if tradeOption is the same', () => {
        notToBeCalled({
            action: initProposals,
            arg   : { contractTypes: ['CALL'] },
            state : { tradeOption },
        });
    });
    it('Should REQUEST_ONE_PROPOSAL', () => {
        toBeCalledWith({
            action    : initProposals,
            arg       : tradeOption,
            state     : { tradeOption: {} },
            calledWith: {
                type: actions.REQUEST_ONE_PROPOSAL,
            },
        });
    });
    it('Should REQUEST_TWO_PROPOSALS', () => {
        toBeCalledWith({
            action    : initProposals,
            arg       : { contractTypes: ['CALL', 'PUT'] },
            state     : { tradeOption: {} },
            calledWith: {
                type: actions.REQUEST_TWO_PROPOSALS,
            },
        });
    });
});
