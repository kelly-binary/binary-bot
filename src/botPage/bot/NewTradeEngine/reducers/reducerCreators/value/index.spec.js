import propertyReducer from './';

const defaultState = { something: 'something' };
const actionType = 'SomeAction';
const payload = { somethingElse: 'somethingElse' };

const reducer = propertyReducer({ defaultState, actionType });

describe('value reducer creator', () => {
    it('should start with the default state', () =>
        expect(reducer(undefined, { type: 'INVALID' })).toEqual(defaultState));
    it('should save the payload for the actionType', () =>
        expect(reducer({}, { type: actionType, payload })).toEqual(payload));
});
