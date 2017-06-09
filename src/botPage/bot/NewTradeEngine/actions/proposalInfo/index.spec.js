import * as properties from '../../constants/properties';
import proposalInfo from './';

const payload = {};
const property = properties.REQUESTED_PROPOSAL;

describe('proposalInfo action creator', () => {
    it('should return an action to update a property in proposalInfo', () => {
        expect(proposalInfo({ property, payload })).toEqual({
            type: `UPDATE_${property}`,
            payload,
        });
    });
    it('should return an action to remove a property in proposalInfo', () => {
        expect(proposalInfo({ property, payload, meta: { remove: true } })).toEqual({
            type: `REMOVE_${property}`,
            payload,
        });
    });
});
