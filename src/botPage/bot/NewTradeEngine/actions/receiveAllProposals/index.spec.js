import * as actions from '../../constants/actions';
import receiveAllProposals from './';

describe('receiveAllProposals action creator', () => {
    it('should return RECEIVE_ALL_PROPOSAL action', () => {
        expect(receiveAllProposals()).toEqual({
            type: actions.RECEIVE_ALL_PROPOSALS,
        });
    });
});
