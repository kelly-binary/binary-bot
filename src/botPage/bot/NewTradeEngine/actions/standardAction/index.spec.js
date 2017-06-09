import standardAction from './';

const type = 'some type';
const actionCreator = standardAction(type);
const payload = {};

describe('standardAction action creator', () => {
    it('should return an action creator with just payload (no error handling)', () => {
        expect(actionCreator(payload)).toEqual({
            type,
            payload,
        });
    });
});
