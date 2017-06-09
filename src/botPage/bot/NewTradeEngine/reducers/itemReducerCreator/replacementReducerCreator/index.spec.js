import replacementReducerCreator from './';

const defaultState = { something: 'something' };
const itemName = 'Some Field';
const payload = { somethingElse: 'somethingElse' };

const reducer = replacementReducerCreator({ defaultState, itemName });

describe('replacement reducer creator', () => {
    it('should start with the default state', () =>
        expect(reducer(undefined, { type: 'INVALID' })).toEqual(defaultState));
    it('should save the payload for the itemName', () =>
        expect(reducer({}, { type: `UPDATE_${itemName}`, payload })).toEqual(payload));
});
