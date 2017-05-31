import * as actions from '../../../constants/actions';
import requestProposals from './';

const payload = { amount: 1 };

describe('Requested Proposals Reducer', () => {
    it('should start with empty object', () => {
        expect(requestProposals({}, actions.INVALID)).toEqual({});
    });
    it('should start with empty object', () => {
        expect(requestProposals({}, { type: actions.REQUEST_PROPOSAL, payload })).toEqual(payload);
    });
});
