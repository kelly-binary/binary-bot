import * as actions from '../../constants/actions';

import stopBecauseOfError from './';

const payload = {};

describe('stopBecauseOfError action creator', () => {
    it('should return STOP_BECAUSE_OF_ERROR action', () => {
        expect(stopBecauseOfError(payload)).toEqual({
            type: actions.STOP_BECAUSE_OF_ERROR,
            payload,
        });
    });
});
